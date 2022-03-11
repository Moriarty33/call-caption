import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import useRecordAudio from "../hooks/useRecordAudio";
import { cleanMessages, selectStatus } from "../store/audioSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { AudioStatus } from "../types/audioStatus";
import MainButton from "./MainButton";
import Spinner from "./Spinner";
import { audioOptions } from "../constants/audioOptions";
import RNPickerSelect from "react-native-picker-select";

export function Header() {
  const [audioSource, setAudioSource] = useState<number>(
    audioOptions.audioSource
  );
  const { start, stop } = useRecordAudio(audioSource);
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);

  function HeaderButton() {
    if (status === AudioStatus.notActive) {
      return (
        <MainButton
          title="Start"
          onPress={start}
          style={{ backgroundColor: "green" }}
        />
      );
    }

    if (status === AudioStatus.active) {
      return (
        <MainButton
          title="Stop"
          onPress={stop}
          style={{ backgroundColor: "red" }}
        />
      );
    }

    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Text style={{ marginRight: 4, fontSize: 12 }}>Loading</Text>
        <Spinner />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Audio Source</Text>
      <RNPickerSelect
        disabled={status !== AudioStatus.notActive}
        placeholder={{}}
        style={{
          inputAndroid: styles.picker,
        }}
        value={audioSource}
        onValueChange={setAudioSource}
        items={[
          { label: "Microphone", value: 1 },
          { label: "Voice recognition", value: 6 },
        ]}
      />
      <View
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <HeaderButton />
        <MainButton
          title="Clean"
          disabled={status === AudioStatus.init}
          style={{ marginLeft: 16 }}
          onPress={() => dispatch(cleanMessages())}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.025)",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  picker: {
    backgroundColor: "rgba(0,0,0,0.1)",
    marginBottom: 8,
    padding: 0,
    margin: 0,
  },
});
