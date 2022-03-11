import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  Text,
} from "react-native";

export type BlackButtonProps = {
  title: string;
  disabled?: boolean | undefined;
  outlined?: boolean | undefined;
  onPress?: () => void;
  style?: StyleProp<ViewStyle> | undefined;
};

const defaultProps: BlackButtonProps = {
  title: "",
  onPress: () => null,
};

const MainButton = (props: BlackButtonProps) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.disabled}
      style={[
        styles.button,
        props.outlined ? styles.outlinedButton : styles.regularButton,
        props.style,
        { opacity: props.disabled ? 0.1 : 1 },
      ]}
    >
      <Text
        style={[
          styles.text,
          props.outlined ? styles.outlinedText : styles.regularText,
        ]}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

MainButton.defaultProps = defaultProps;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  outlinedButton: {
    borderWidth: 1,
    borderColor: "black",
  },
  regularButton: {
    backgroundColor: "black",
  },
  text: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
  },
  outlinedText: {
    color: "black",
  },
  regularText: {
    color: "white",
  },
});

export default React.memo(MainButton);
