import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function () {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.6}>
      <Ionicons name="image-outline" size={40} color={Colors.light.accent} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.white,
    borderWidth: 1,
    borderColor: Colors.light.accent,
    borderStyle: "dashed",
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
