import React from "react";
import { Button, PermissionsAndroid, StyleSheet, View } from "react-native";

const RecordAudioPermission = ({ onGranted }: { onGranted: () => void }) => {
  async function request() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: "Bluetooth",
        message: "Bluetooth allow you record audio",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use Record Audio");
      onGranted();
    } else {
      console.log("Record Audio permission denied");
      return;
    }
  }

  return (
    <View style={styles.container}>
      <Button title="Allow to Record Audio" onPress={request}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});

export default RecordAudioPermission;
