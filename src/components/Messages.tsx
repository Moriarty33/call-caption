import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { selectMessages } from "../store/audioSlice";
import { useAppSelector } from "../store/hooks";

const Messages = () => {
  const messages = useAppSelector(selectMessages);

  return (
    <ScrollView style={styles.container}>
      {messages.map((message, index) => (
        <View style={styles.messageItem} key={index}>
          <Text>{message}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 18,
  },
  messageItem: {
    backgroundColor: "rgba(0,0,0,0.05)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
});

export default Messages;
