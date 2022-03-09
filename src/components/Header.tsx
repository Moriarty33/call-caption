import React from "react";
import { StyleSheet, Text, View } from "react-native";
import useRecordAudio from "../hooks/useRecordAudio";
import { cleanMessages, selectStatus } from "../store/audioSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { AudioStatus } from "../types/audioStatus";
import MainButton from "./MainButton";
import Spinner from "./Spinner";

export function Header() {
  const { start, stop } = useRecordAudio();
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
      <HeaderButton />
      <MainButton
        title="Clean"
        disabled={status === AudioStatus.init}
        style={{ marginLeft: 16 }}
        onPress={() => dispatch(cleanMessages())}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.025)",
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
});
