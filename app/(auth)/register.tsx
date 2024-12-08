import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import ThemedBackground from "@/components/ThemedBackground";
import { router } from "expo-router";

export default function () {
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

        <View style={{ flex: 2 }}>
          {/* <TextInputLight
          title="Username"
          placeholder="Enter Username"
          value={username}
          onChangeText={(txt) => setUsername(txt)}
        /> */}
          <TouchableOpacity onPress={() => router.back()}>
            <Text>Go Back</Text>
          </TouchableOpacity>
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
});
