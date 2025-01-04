import { Text, View, Image, StyleSheet } from "react-native";
import ThemedBackground from "@/components/ThemedBackground";
import RoundedButton from "@/components/buttons/RoundedButton";
import { Colors } from "@/constants/Colors";
import { router, useFocusEffect } from "expo-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const logo = require("@/assets/images/icon.png");

export default function Index() {
  const user = useSelector((state: any) => state.user);
  useFocusEffect(() => {
    if (user) {
      router.replace("/(drawer)/dashboard");
    }
  });

  return (
    <ThemedBackground>
      <View style={{ flex: 1, justifyContent: "space-evenly" }}>
        <View
          style={{
            alignItems: "center",
            gap: 40,
          }}
        >
          <Image source={logo} style={{ width: 200, height: 200 }} />
          {/* <Text style={styles.welcomeText}>Welcome To FMB 52</Text> */}
        </View>
        <RoundedButton
          title="Let's Continue"
          onPress={() => router.replace("/(auth)/login")}
        />
      </View>
    </ThemedBackground>
  );
}

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.light.accent,
  },
});
