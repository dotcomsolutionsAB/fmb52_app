import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import ThemedBackground from "@/components/ThemedBackground";
import TextInputLight from "@/components/textinputs/TextInputLight";
import { Colors } from "@/constants/Colors";
import OTP from "@/components/textinputs/OTP";
import RoundedButton from "@/components/buttons/RoundedButton";
import client from "@/connection/client";
import LineError from "@/components/text/LineError";
import { signin } from "@/store/reducer/user";
import { useDispatch } from "react-redux";

const OTP_LENGTH = 6;
export default function () {
  const { ITS } = useLocalSearchParams();
  const [error, setError] = useState("");

  const [doResendCode, setDoResendCode] = useState(false);
  const [otp, setOtp] = useState("");
  const [enableVerify, setEnableVerify] = useState(false);

  const dispatch = useDispatch();

  const getOTP = async () => {
    setDoResendCode(false);
    try {
      const { data, status } = await client.post("/get_otp", {
        username: ITS,
      });
      if (status === 404 || status === 500) {
        Alert.alert("Error", data.message);
        return;
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Error", "Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      setError("");
      const { data } = await client.post(`/login/${otp}`, {
        username: ITS,
      });
      if (data.success === false) {
        setError(data.message);
        return;
      }
      dispatch(signin(data.data));
      router.replace("/(drawer)/dashboard");
    } catch (e) {
      console.log(e);
      Alert.alert("Error", "Failed to verify OTP");
    }
  };

  useEffect(() => {
    getOTP();
  }, []);

  useEffect(() => {
    if (doResendCode) return;
    const timer = setTimeout(() => {
      setDoResendCode(true);
    }, 30000);
    return () => clearTimeout(timer);
  }, [doResendCode]);

  useEffect(
    () =>
      otp.length === OTP_LENGTH
        ? setEnableVerify(true)
        : setEnableVerify(false),
    [otp]
  );

  return (
    <ThemedBackground>
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("@/assets/images/icon.png")}
            style={{ width: 150, height: 150 }}
          />
        </View>

        <View style={{ flex: 2, justifyContent: "space-evenly" }}>
          <Text style={styles.otpText}>Enter the code sent to your phone </Text>
          <View style={{ gap: 10 }}>
            <OTP length={OTP_LENGTH} value={otp} onChangeText={setOtp} />
            {error ? (
              <LineError message={error} />
            ) : (
              <Text style={{ color: Colors.light.accent }}>
                Enter the 6 digit code sent we've sent to {ITS}
              </Text>
            )}
          </View>
          <View style={{ gap: 10 }}>
            <TouchableOpacity disabled={!doResendCode} onPress={getOTP}>
              <Text style={styles.assistButtons}>
                {doResendCode ? "Resend OTP" : "The code should arrive in 30s"}
              </Text>
            </TouchableOpacity>
            <RoundedButton
              title="Verify and Login"
              disabled={!enableVerify}
              onPress={verifyOtp}
            />
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.assistButtons}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ThemedBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignSelf: "stretch",
    padding: 20,
  },
  otpText: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.light.accent,
    textAlign: "center",
  },
  assistButtons: {
    fontSize: 15,
    color: Colors.light.accent,
    fontWeight: "500",
    textAlign: "center",
  },
});
