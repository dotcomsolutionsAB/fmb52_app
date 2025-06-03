import {
  ButtonProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

interface RoundButtonProps extends ButtonProps {
  inverted?: boolean;
}

export default function RoundedButton(params: RoundButtonProps) {
  return (
    <TouchableOpacity
      disabled={params.disabled}
      style={[
        styles.container,
        params.inverted ? { backgroundColor: Colors.light.hover } : null,
        params.disabled ? { backgroundColor: Colors.light.primary } : null,
      ]}
      activeOpacity={0.6}
      onPress={params.onPress}
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
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.accent,
    minWidth: 250,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.light.accent,
    marginTop: 15,
  },
  text: {
    color: Colors.light.white,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
