import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import ThemedBackground from "@/components/ThemedBackground";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import TextInputLight from "@/components/textinputs/TextInputLight";
import RoundedButton from "@/components/buttons/RoundedButton";
import InlineButton from "@/components/buttons/InlineButton";
import OTP from "@/components/textinputs/OTP";

const verificationStages = {
  NOT_STARTED: 0,
  STARTED: 1,
  COMPLETED: 2,
  REGISTERED: 3,
};

const OTP_LENGTH = 6;

export default function () {
  const [verificationStage, setVerificationStage] = useState(
    verificationStages["NOT_STARTED"]
  );

  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  async function handleVerification() {
    if (verificationStage === verificationStages["NOT_STARTED"])
      setVerificationStage(verificationStages["STARTED"]);
  }

  async function verifyOTP() {
    setVerificationStage(verificationStages["COMPLETED"]);
  }

  async function registerUser() {
    setVerificationStage(verificationStages["REGISTERED"]);
  }

  return (
    <ThemedBackground>
      <ScrollView
        style={{ flex: 1, alignSelf: "stretch" }}
        contentContainerStyle={{ padding: 10, gap: 15 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 35,
          }}
        >
          <Image
            source={require("@/assets/images/icon.png")}
            style={{ width: 150, height: 150 }}
          />
        </View>
        {verificationStage === verificationStages["REGISTERED"] ? (
          <View style={{ gap: 50, alignItems: "center", marginTop: 30 }}>
            <Image
              source={require("@/assets/images/registered.png")}
              style={{
                height: 150,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: Colors.light.accent,
                borderRightWidth: 1,
                borderLeftWidth: 1,
              }}
            />
            <RoundedButton title="Go to Login" onPress={() => router.back()} />
          </View>
        ) : (
          <View style={{ gap: 15 }}>
            <TextInputLight
              title="City"
              placeholder="Enter City"
              value={city}
              onChangeText={setCity}
            />
            <TextInputLight
              title="Name"
              placeholder="Enter Name"
              value={name}
              onChangeText={setName}
            />
            <TextInputLight
              title="Phone Number"
              placeholder="+91*******786"
              keyboardType="number-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
            <TextInputLight
              title="Email"
              placeholder="Enter Email"
              value={email}
              onChangeText={setEmail}
            >
              {verificationStage === verificationStages["NOT_STARTED"] ||
              verificationStage === verificationStages["STARTED"] ? (
                <InlineButton
                  title="Verify Email"
                  disabled={verificationStage === verificationStages["STARTED"]}
                  onPress={handleVerification}
                />
              ) : (
                <Image
                  source={require("@/assets/images/tick.png")}
                  style={{ width: 25, height: 25 }}
                />
              )}
            </TextInputLight>
            {verificationStage === verificationStages["STARTED"] ? (
              <View style={{ gap: 10 }}>
                <OTP length={6} value={otp} onChangeText={setOtp} />
                <RoundedButton
                  title="Verify"
                  onPress={verifyOTP}
                  disabled={otp.length !== OTP_LENGTH}
                />
              </View>
            ) : null}
            <RoundedButton
              title="Register"
              disabled={verificationStage !== verificationStages["COMPLETED"]}
              onPress={registerUser}
            />
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.assistButtons}>Go Back</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </ThemedBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignSelf: "stretch",
    paddingHorizontal: 20,
  },
  assistButtons: {
    fontSize: 15,
    color: Colors.light.accent,
    fontWeight: "500",
    textAlign: "center",
  },
});
