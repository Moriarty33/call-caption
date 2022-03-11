import { useEffect } from "react";
import LiveAudioStream from "react-native-live-audio-stream";
import { audioOptions } from "../constants/audioOptions";
import { useSocket } from "./useSocket";

const useRecordAudio = (audioSource: number) => {
  const { onData, start, stop } = useSocket();

  async function initApp() {
    console.log("INIT WITH AUDIO SOURCE", audioSource);
    LiveAudioStream.init({
      ...audioOptions,
      audioSource,
    });
    LiveAudioStream.on("data", onData);
  }

  useEffect(() => {
    initApp();
  }, [audioSource]);

  return {
    start,
    stop,
  };
};

export default useRecordAudio;
