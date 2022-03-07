import axios from "axios";
import { useEffect } from "react";
import { selectIsRecording } from "../store/audioSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
export function useSocket() {
  const apiKey = "be7cb5770ef14801916d8183acc649f6";
  let socket: WebSocket | null = null;
  const dispatch = useAppDispatch();
  const isRecording = useAppSelector(selectIsRecording);

  async function initSocket() {
    const response = await axios.post(
      "https://api.assemblyai.com/v2/realtime/token",
      { expires_in: 3600 },
      { headers: { authorization: apiKey } }
    );
    const { data } = response;

    socket = await new WebSocket(
      `wss://api.assemblyai.com/v2/realtime/ws?sample_rate=32000&token=${data.token}`
    );

    if (!socket) {
      console.log("Socket not Opened");
      return;
    }

    const texts: any = {};
    socket.onmessage = (message) => {
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

    socket.onopen = () => {
      console.log("Socket Open");
    };

    socket.onerror = (event) => {
      console.error("onerror", event);
      socket!.close();
    };

    socket.onclose = (event) => {
      console.log("onclose", event);
      socket = null;
    };
  }

  function onData(data: string) {
    if (socket) {
      socket.send(JSON.stringify({ audio_data: data }));
    }
  }

  return {
    onData,
  };
}
