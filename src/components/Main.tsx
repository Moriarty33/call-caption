import React from "react";
import { View } from "react-native";
import useRecordAudio from "../hooks/useRecordAudio";
import { useCheckRecordAudioPermissions } from "../hooks/useCheckRecordAudioPermissions";
import { Header } from "./Header";
import RecordAudioPermission from "./RecordAudioPermission";

const Main = () => {
  const { recordAudioPermission, grantedAudioPermission } =
    useCheckRecordAudioPermissions();

  if (!recordAudioPermission) {
    return <RecordAudioPermission onGranted={grantedAudioPermission} />;
  }

  return (
    <View>
      <Header />
    </View>
  );
};

export default Main;
