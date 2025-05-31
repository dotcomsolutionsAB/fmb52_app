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

export default function LoginPassword() {
  const params = useLocalSearchParams();
  const [ITS, setITS] = useState(
    Array.isArray(params.ITS) ? params.ITS[0] || "" : params.ITS || ""
  );
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const login = async () => {
    if (password.length === 0 || ITS.length === 0) {
      setError("ITS or Password cannot be empty");
      return;
    }
    try {
      const { data } = await client.post("/login", {
        username: ITS,
        password,
      });
      if (data.success === false) {
        setError(data.message);
        return;
      }
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
            marginTop: 50,
            marginBottom: 20,
          }}
        >
          <Image
            source={require("@/assets/images/icon-no-bg.png")}
            style={{ width: 280, height: 280 }}
          />
        </View>

        <View style={{ flex: 2, gap: 40 }}>
          <View style={{ gap: 20 }}>
            <TextInputLight
              title="ITS"
              placeholder="Enter ITS"
              value={ITS}
              onChangeText={(txt) => setITS(txt)}
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
