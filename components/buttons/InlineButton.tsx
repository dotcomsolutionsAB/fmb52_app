import {
  ButtonProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

interface InlineButtonProps extends ButtonProps {
  inverted?: boolean;
}

const InlineButton = (params: InlineButtonProps) => {
  return (
    <TouchableOpacity
      disabled={params.disabled}
      style={[
        styles.container,
        params.inverted ? { backgroundColor: Colors.light.hover } : null,
        params.disabled ? { backgroundColor: Colors.light.primary } : null,
      ]}
      onPress={params.onPress}
      activeOpacity={0.6}
    >
      <Text
        style={[
          styles.text,
          params.inverted ? { color: Colors.light.accent } : null,
        ]}
      >
        {params.title}
      </Text>
    </TouchableOpacity>
  );
};

export default InlineButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.accent,
    paddingVertical: 7,
    paddingHorizontal: 7,
    borderRadius: 5,
  },
  text: {
    fontWeight: "500",
    color: Colors.light.white,
    textAlign: "center",
  },
});
