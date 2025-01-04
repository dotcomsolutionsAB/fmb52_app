import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import RoundedButton from "@/components/buttons/RoundedButton";
import ThemedBackground from "@/components/ThemedBackground";
import TextInputLight from "@/components/textinputs/TextInputLight";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import LineError from "@/components/text/LineError";

export default function () {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const routeToLogin = (route: string = "") => {
    if (username.length === 0) {
      setError("Username cannot be empty");
      return;
    }
    router.navigate({
      pathname: route,
      params: { username },
    });
  };

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

        <View style={{ flex: 2, gap: 10, justifyContent: "space-around" }}>
          <View style={{ gap: 10 }}>
            <TextInputLight
              title="Username"
              placeholder="Enter Username"
              value={username}
              onChangeText={(txt) => setUsername(txt)}
              onChange={() => error && setError("")}
            />
            {error ? <LineError message={error} /> : null}
          </View>
          <View style={{ gap: 10 }}>
            <RoundedButton
              title="Login with OTP"
              onPress={() => routeToLogin("/login-otp")}
            />
            <SepartorOR />
            <RoundedButton
              inverted={true}
              title="Login with Password"
              onPress={() => routeToLogin("/login-password")}
            />
          </View>
          <RegisterNow />
        </View>
      </View>
    </ThemedBackground>
  );
}

const SepartorOR = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "stretch",
        gap: 5,
        marginHorizontal: 15,
      }}
    >
      <View
        style={{
          flex: 1,
          height: 1,
          alignSelf: "center",
          backgroundColor: Colors.light.accent,
        }}
      />
      <Text
        style={{ color: Colors.light.accent, fontWeight: "500", fontSize: 15 }}
      >
        OR
      </Text>
      <View
        style={{
          flex: 1,
          height: 1,
          alignSelf: "center",
          backgroundColor: Colors.light.accent,
        }}
      />
    </View>
  );
};

const RegisterNow = () => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "center", gap: 5 }}>
      <Text style={{ fontWeight: "300" }}>Dont have an account?</Text>
      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={{ color: Colors.light.accent, fontWeight: "500" }}>
          Register Now
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignSelf: "stretch",
    padding: 20,
  },
});
