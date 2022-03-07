import { useEffect } from "react";
import LiveAudioStream from "react-native-live-audio-stream";
import { audioOptions } from "../constants/audioOptions";
import { useSocket } from "../hooks/useSocket";

const RecordAudioHandler = () => {
  const { onData } = useSocket();

  async function initApp() {
    LiveAudioStream.init(audioOptions);
    LiveAudioStream.on("data", onData);
  }

  useEffect(() => {
    initApp();
  }, []);

  return null;
};

export default RecordAudioHandler;
