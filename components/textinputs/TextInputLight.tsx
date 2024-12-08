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
      <View style={styles.textbox}>
        <TextInput
          style={[styles.textInput, params.style]}
          {...params}
          children={null}
          placeholderTextColor={
            params.placeholderTextColor || Colors.light.accent
          }
        />
        {params.children}
      </View>
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
  textbox: {
    flexDirection: "row",
    backgroundColor: Colors.light.white,
    borderWidth: 1,
    borderColor: Colors.light.accent,
    borderRadius: 7,
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 5,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 15,
    fontSize: 15,
    alignSelf: "stretch",
  },
});
