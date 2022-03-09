import { useEffect } from "react";
import LiveAudioStream from "react-native-live-audio-stream";
import { audioOptions } from "../constants/audioOptions";
import { useSocket } from "./useSocket";

const useRecordAudio = () => {
  const { onData, start, stop } = useSocket();

  async function initApp() {
    LiveAudioStream.init(audioOptions);
    LiveAudioStream.on("data", onData);
  }

  useEffect(() => {
    initApp();
  }, []);

  return {
    start,
    stop,
  };
};

export default useRecordAudio;
