import {
  ButtonProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

const InlineButton = (params: ButtonProps) => {
  return (
    <TouchableOpacity
      disabled={params.disabled}
      style={[
        styles.container,
        params.disabled ? { backgroundColor: Colors.light.primary } : null,
      ]}
      onPress={params.onPress}
      activeOpacity={0.6}
    >
      <Text style={styles.text}>{params.title}</Text>
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
  },
});
