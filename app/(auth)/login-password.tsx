import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import ThemedBackground from "@/components/ThemedBackground";
import TextInputLight from "@/components/textinputs/TextInputLight";
import { useLocalSearchParams, ScreenProps, router } from "expo-router";
import { Colors } from "@/constants/Colors";
import RoundedButton from "@/components/buttons/RoundedButton";
import client from "@/connection/client";
import LineError from "@/components/text/LineError";
import { signin } from "@/store/reducer/user";
import { useDispatch } from "react-redux";

export default function () {
  const params = useLocalSearchParams();
  const [username, setUsername] = useState(params.username || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const login = async () => {
    if (password.length === 0 || username.length === 0) {
      setError("Username or Password cannot be empty");
      return;
    }
    try {
      const { data } = await client.post("/login", {
        username,
        password,
      });
      if (data.success === false) {
        setError(data.message);
        return;
      }
      console.log("login details", data);
      dispatch(signin(data.data));
      router.replace("/(drawer)/dashboard");
    } catch (err) {
      Alert.alert("Error", "Something went wrong");
    }
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

        <View style={{ flex: 2, justifyContent: "space-evenly" }}>
          <View style={{ gap: 20 }}>
            <TextInputLight
              title="Username"
              placeholder="Enter Username"
              value={username}
              onChangeText={(txt) => setUsername(txt)}
              onChange={() => error && setError("")}
            />
            <TextInputLight
              title="Password"
              placeholder="Enter Password"
              value={password}
              secureTextEntry={true}
              onChangeText={(txt) => setPassword(txt)}
              onChange={() => error && setError("")}
            />
            {error ? <LineError message={error} /> : null}
          </View>
          <View style={{ gap: 10 }}>
            <RoundedButton title="Login" onPress={login} />
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
  assistButtons: {
    fontSize: 15,
    color: Colors.light.accent,
    fontWeight: "500",
    textAlign: "center",
  },
});
