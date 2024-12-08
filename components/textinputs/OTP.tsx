import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";

interface OTPProps extends TextInputProps {
  length: number;
}

var numberRegexG = /^[0-9]*$/;

const OTP = (params: OTPProps) => {
  //create Arrays of ref for each input
  const [v, setV] = useState(
    Array.from({ length: params.length }).map((_, i) => params.value?.[i] || "")
  );
  const refs = Array.from({ length: params.length }).map(() =>
    React.createRef<TextInput>()
  );

  useEffect(() => {
    params.onChangeText && params.onChangeText(v.join(""));
  }, [v]);

  function handleInput(val: string, index: number) {
    if (!numberRegexG.test(val)) return;
    if (index !== params.length - 1 && val.length > 0)
      refs[index + 1].current?.focus();
    setV((prev) => prev.map((ch, i) => (i === index ? val : ch)));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>OTP</Text>
      <View style={styles.otpContainer}>
        {refs.map((ref, i) => (
          <TextInput
            keyboardType="numeric"
            key={i}
            ref={ref}
            style={[styles.textInput, params.style]}
            {...params}
            maxLength={1}
            value={v[i]}
            onChangeText={(txt) => handleInput(txt, i)}
            // onKeyPress={({ nativeEvent }) => {
            //   nativeEvent.key === "Backspace" &&
            //     i > 0 &&
            //     refs[i - 1].current?.focus();
            // }}
          />
        ))}
      </View>
    </View>
  );
};

export default OTP;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    gap: 10,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: Colors.light.accent,
    fontWeight: "500",
    fontSize: 14,
  },
  textInput: {
    textAlign: "center",
    minWidth: 50,
    paddingHorizontal: 10,
    paddingVertical: 15,
    fontSize: 20,
    color: Colors.light.accent,
    backgroundColor: Colors.light.white,
    borderWidth: 1,
    borderColor: Colors.light.accent,
    borderRadius: 7,
  },
});
