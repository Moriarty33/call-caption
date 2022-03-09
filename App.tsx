import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import Main from "./src/components/Main";
import useCachedResources from "./src/hooks/useCachedResources";
import { store } from "./src/store";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <View style={{ paddingTop: 24 }}>
      <Provider store={store}>
        <Main />
      </Provider>
      <StatusBar style="auto" />
    </View>
  );
}
