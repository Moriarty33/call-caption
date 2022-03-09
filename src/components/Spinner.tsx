import React from "react";
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleProp,
  ViewStyle,
} from "react-native";

const color = "#cecece";

const Spinner = ({
  size,
  style,
}: {
  style?: StyleProp<ViewStyle> | undefined;
} & ActivityIndicatorProps) => {
  return <ActivityIndicator color={color} style={style} size={size} />;
};

Spinner.defaultProps = {
  style: undefined,
};

export default React.memo(Spinner);
