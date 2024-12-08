import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TextInputProps,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

interface TextInputLightProps extends TextInputProps {
  title: string;
}

const TextInputLight = (params: TextInputLightProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{params.title}</Text>
      <TextInput
        style={[styles.textInput, params.style]}
        {...params}
        placeholderTextColor={
          params.placeholderTextColor || Colors.light.accent
        }
      />
    </View>
  );
};

export default TextInputLight;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    gap: 10,
  },
  text: {
    color: Colors.light.accent,
    fontWeight: "500",
    fontSize: 14,
  },
  textInput: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    fontSize: 15,
    backgroundColor: Colors.light.white,
    borderWidth: 1,
    borderColor: Colors.light.accent,
    borderRadius: 7,
  },
});
