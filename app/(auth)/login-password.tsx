import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import ThemedBackground from "@/components/ThemedBackground";
import TextInputLight from "@/components/textinputs/TextInputLight";
import { useLocalSearchParams, ScreenProps, router } from "expo-router";
import { Colors } from "@/constants/Colors";
import RoundedButton from "@/components/buttons/RoundedButton";

export default function () {
  const { username: user_name } = useLocalSearchParams();
  const [username, setUsername] = useState(user_name);
  const [password, setPassword] = useState("");
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
            />
            <TextInputLight
              title="Password"
              placeholder="Enter Password"
              value={password}
              secureTextEntry={true}
              onChangeText={(txt) => setPassword(txt)}
            />
          </View>
          <View style={{ gap: 10 }}>
            <RoundedButton title="Login" />
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
