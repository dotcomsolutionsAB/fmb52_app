import {
  ButtonProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

export default function RoundedButtonInverted(params: ButtonProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      onPress={params.onPress}
    >
      <Text style={styles.text}>{params.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    minWidth: 250,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.light.accent,
  },
  text: {
    color: Colors.light.accent,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
