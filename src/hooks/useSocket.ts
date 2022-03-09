import axios from "axios";
import { useRef } from "react";
import LiveAudioStream from "react-native-live-audio-stream";
import { setStatus } from "../store/audioSlice";
import { useAppDispatch } from "../store/hooks";
import { AudioStatus } from "../types/audioStatus";

export function useSocket() {
  const apiKey = "be7cb5770ef14801916d8183acc649f6";
  const socket = useRef<WebSocket | null>();
  const dispatch = useAppDispatch();

  async function initSocket() {
    const response = await axios.post(
      "https://api.assemblyai.com/v2/realtime/token",
      { expires_in: 3600 },
      { headers: { authorization: apiKey } }
    );
    const { data } = response;

    socket.current = await new WebSocket(
      `wss://api.assemblyai.com/v2/realtime/ws?sample_rate=32000&token=${data.token}`
    );

    if (!socket.current) {
      dispatch(setStatus(AudioStatus.notActive));
      console.log("Socket not Opened");
      return;
    }

    const texts: any = {};
    socket.current.onmessage = (message) => {
      let msg = "";
      const res = JSON.parse(message.data);
      console.log("res", res);
      texts[res.audio_start] = res.text;
      const keys = Object.keys(texts);
      keys.sort((a, b) => a - b);
      for (const key of keys) {
        if (texts[key]) {
          msg += ` ${texts[key]}`;
        }
      }

      // setMessage(msg);
    };

    socket.current.onopen = () => {
      LiveAudioStream.start();
      dispatch(setStatus(AudioStatus.active));
    };

    socket.current.onerror = (event) => {
      console.error("onerror", event);
      socket.current?.close();
    };

    socket.current.onclose = (event) => {
      socket.current = null;
      console.log("onclose", event);
      LiveAudioStream.stop();
      dispatch(setStatus(AudioStatus.notActive));
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
