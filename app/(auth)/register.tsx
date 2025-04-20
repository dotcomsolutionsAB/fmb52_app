import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import ThemedBackground from "@/components/ThemedBackground";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import TextInputLight from "@/components/textinputs/TextInputLight";
import RoundedButton from "@/components/buttons/RoundedButton";
import InlineButton from "@/components/buttons/InlineButton";
import OTP from "@/components/textinputs/OTP";
import LineError from "@/components/text/LineError";
import client from "@/connection/client";
import { AxiosError } from "axios";
import SinglePicker from "@/components/dropdown/SinglePicker";

const verificationStages = {
  NOT_STARTED: 0,
  STARTED: 1,
  COMPLETED: 2,
  REGISTERED: 3,
};

const OTP_LENGTH = 6;

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function () {
  const [verificationStage, setVerificationStage] = useState(
    verificationStages["NOT_STARTED"]
  );

  const [city, setCity] = useState("");
  const [adminName, setAdminName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [selectedCurrencyId, setSelectedCurrencyId] = useState(null);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const [fetchOTP, setFetchOTP] = useState("");
  const [currencies, setCurrencies] = useState([]);
  useEffect(() => {
    fetchCurrencies();
  }, []);
  async function fetchCurrencies() {
    try {
      const { data, status } = await client.get("/currencies");
      if (status === 200) {
        setCurrencies(data.data);
      } else throw new Error(data.message);
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  }

  async function handleVerification() {
    if (verificationStage === verificationStages["NOT_STARTED"])
      setVerificationStage(verificationStages["STARTED"]);
    await sendOTP(email);
  }

  async function sendOTP(email: string) {
    try {
      const { data, status } = await client.post(
        `/verify_email?email=${email}`
      );
      if (status === 200) {
        Alert.alert("Success", data.message);
        setFetchOTP(data.code);
      } else throw new Error(data.message);
    } catch (err: any) {
      if (err instanceof AxiosError) {
        Alert.alert("Error", err.response?.data.message);
      } else {
        Alert.alert("Error", err.message);
      }
    }
  }

  async function verifyOTP() {
    console.warn({ otp, fetchOTP });
    if (otp !== fetchOTP.toString()) {
      setError("You have entered an incorrect OTP");
      return;
    }
    setError("");
    setVerificationStage(verificationStages["COMPLETED"]);
  }

  async function registerUser() {
    if (!city || !adminName || !mobile || !email || !selectedCurrencyId) {
      Alert.alert("Error", "All fields are required.");
      return;
    }
    try {
      const { data, status } = await client.post("/register-jamaat", {
        name: city,
        admin_name: adminName,
        mobile: mobile,
        email,
        currency_id: selectedCurrencyId,
      });
      if (status !== 200) throw new Error(data.message);
      setVerificationStage(verificationStages["REGISTERED"]);
    } catch (err: any) {
      if (err instanceof AxiosError)
        Alert.alert("Error", err.response?.data.message);
      else Alert.alert("Error", err.message);
    }
  }

  const isValidEmail = (email: string) => emailRegex.test(email);

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
              value={adminName}
              onChangeText={setAdminName}
            />
            <TextInputLight
              title="Phone Number"
              placeholder="+91*******786"
              keyboardType="number-pad"
              value={mobile}
              onChangeText={setMobile}
            />
            {/* <TextInputLight
              title="Currency"
              placeholder="Select"
              // keyboardType="number-pad"
              value={currencies[0]}
              // onChangeText={setMobile}
            /> */}
            <SinglePicker
              label="Currency"
              options={currencies}
              labelField="currency_code"
              valueField="id"
              onChange={(value: any) => setSelectedCurrencyId(value)}
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
                  disabled={
                    verificationStage === verificationStages["STARTED"] ||
                    !isValidEmail(email)
                  }
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
            {error ? <LineError message={error} /> : null}
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
