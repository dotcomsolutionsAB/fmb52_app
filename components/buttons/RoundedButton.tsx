import {
  ButtonProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

export default function RoundedButton(params: ButtonProps) {
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
    backgroundColor: Colors.light.accent,
    minWidth: 250,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 50,
  },
  text: {
    color: Colors.light.white,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
