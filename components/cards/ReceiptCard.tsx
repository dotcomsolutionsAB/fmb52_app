import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import InlineButton from "../buttons/InlineButton";
import { Ionicons } from "@expo/vector-icons";

export default function () {
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.light.white,
          borderWidth: 1,
          borderTopStartRadius: 10,
          borderBottomStartRadius: 10,
          borderColor: Colors.light.accent,
          padding: 10,
          gap: 7,
        }}
      >
        <Text style={{ fontSize: 16, textAlign: "center" }}>
          Mustafabhai Yusuf bhai Badri
        </Text>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1, gap: 3 }}>
            <Text style={styles.subImpText}>ITS : {"4045XXXX"}</Text>
            <Text style={styles.subImpText}>Date : 11/09/2024</Text>
            <Text style={styles.subImpText}>Burhani - A05</Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end", gap: 3 }}>
            <Text
              style={{
                fontSize: 16,
                color: Colors.light.accent,
                fontWeight: "bold",
              }}
            >
              Cash
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: Colors.light.accent,
                fontWeight: "bold",
              }}
            >
              Amount : {"5000"}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: Colors.light.alert,
          padding: 10,
          borderEndEndRadius: 10,
          borderTopEndRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons
          name="download-outline"
          size={24}
          color={Colors.light.white}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  subImpText: {
    fontSize: 14,
    color: "darkgrey",
  },
});
