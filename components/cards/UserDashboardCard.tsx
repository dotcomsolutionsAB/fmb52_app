import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import InlineButton from "../buttons/InlineButton";

export default function () {
  return (
    <View style={styles.container}>
      <View style={{ gap: 10 }}>
        <Image source={require("@/assets/images/profile.png")} />
        <InlineButton title="Edit" inverted={true} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Huzefa Ahmed bhai Chaiwala</Text>
        <View style={{ height: 5 }} />
        <Text style={styles.subtitle}>ITS : {"4045XXXX"}</Text>
        <Text style={styles.subtitle}>Mobile : {"+917003XXXXXX"}</Text>
        <Text style={styles.subtitle}>Sector : {"Burhani"}</Text>
        <Text style={styles.subtitle}>Sub Sector : {"B"}</Text>
        <Text style={styles.subtitle}>Family Members : {"7"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: Colors.light.accent,
    padding: 10,
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.light.white,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.light.white,
  },
});
