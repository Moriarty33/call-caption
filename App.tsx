import { StatusBar } from "expo-status-bar";
import LiveAudioStream from "react-native-live-audio-stream";

import { PermissionsAndroid, StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";

const options = {
  sampleRate: 32000, // default is 44100 but 32000 is adequate for accurate voice recognition
  channels: 1, // 1 or 2, default 1
  bitsPerSample: 16, // 8 or 16, default 16
  audioSource: 6, // android only (see below)
  bufferSize: 4096, // default is 2048
  wavFile: "rec.wav",
};

export default function App() {
  async function initApp() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: "Bluetooth",
        message: "Bluetooth allow you to connect to Bangle",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use Record Audio");
    } else {
      console.log("Record Audio permission denied");
      return;
    }

    LiveAudioStream.init(options);
    LiveAudioStream.on("data", (data) => {
      // base64-encoded audio data chunks
    });
    LiveAudioStream.start();
  }

  useEffect(() => {
    initApp();
    return () => {
      LiveAudioStream.stop();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
