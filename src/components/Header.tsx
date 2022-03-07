import React, { useMemo } from "react";
import { Button, StyleSheet, View } from "react-native";
import {
  selectIsRecording,
  startRecording,
  stopRecording,
} from "../store/audioSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export function Header() {
  const isRecording = useAppSelector(selectIsRecording);
  const dispatch = useAppDispatch();
  const title = useMemo(() => (isRecording ? "Stop" : "Start"), [isRecording]);

  function toggle() {
    if (isRecording) {
      dispatch(stopRecording());
    } else {
      dispatch(startRecording());
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Button title={title} onPress={toggle} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.025)",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
});
