import React, { useMemo } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import useRecordAudio from "../hooks/useRecordAudio";
import { selectStatus } from "../store/audioSlice";
import { useAppSelector } from "../store/hooks";
import { AudioStatus } from "../types/audioStatus";

export function Header() {
  const { start, stop } = useRecordAudio();

  const status = useAppSelector(selectStatus);

  const title = useMemo(() => {
    if (status === AudioStatus.notActive) {
      return "Start";
    }

    if (status === AudioStatus.active) {
      return "Stop";
    }

    return "Loading";
  }, [status]);

  function toggle() {
    if (status === AudioStatus.notActive) {
      return start();
    }

    if (status === AudioStatus.active) {
      return stop();
    }
  }

  return (
    <View style={styles.container}>
      <Text>{status}</Text>
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
