import { useRef } from "react";
import LiveAudioStream from "react-native-live-audio-stream";
import { AssemblyaiDao } from "../services/dao/AssemblyaiDao";
import {
  makeLastMessageCompleted,
  setLastMessage,
  setStatus,
} from "../store/audioSlice";
import { useAppDispatch } from "../store/hooks";
import { AudioStatus } from "../types/audioStatus";

export function useSocket() {
  const socket = useRef<WebSocket | null>();
  const dispatch = useAppDispatch();

  async function initSocket() {
    socket.current = await AssemblyaiDao.startSocket();

    if (!socket.current) {
      dispatch(setStatus(AudioStatus.notActive));
      console.log("Socket not Opened");
      return;
    }

    socket.current.onmessage = (message) => {
      const res = JSON.parse(message.data);

      console.log(res);

      if (!res.text) {
        return;
      }

      if (res.message_type === "PartialTranscript") {
        dispatch(setLastMessage(res.text));
      }

      if (res.message_type === "FinalTranscript") {
        dispatch(makeLastMessageCompleted(res.text));
      }
    };

    socket.current.onopen = () => {
      LiveAudioStream.start();
      dispatch(setStatus(AudioStatus.active));
    };

    socket.current.onerror = (event) => {
      console.log("onerror", event);
      socket.current?.close();
    };

    socket.current.onclose = (event) => {
      socket.current = null;
      console.log("onclose", event);
      LiveAudioStream.stop();
      dispatch(setStatus(AudioStatus.notActive));
      dispatch(makeLastMessageCompleted(null));
    };
  }

  function onData(data: string) {
    if (socket.current) {
      socket.current.send(JSON.stringify({ audio_data: data }));
    }
  }

  async function start() {
    dispatch(setStatus(AudioStatus.init));
    await initSocket();
  }

  function stop() {
    if (socket.current) {
      socket.current.close(1000, "Stop By User");
    }
  }

  return {
    onData,
    start,
    stop,
  };
}
