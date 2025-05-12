import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { View } from "react-native";

export default function QuickAccessCard({ route, name, icon }) {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        router.push(route);
      }}
    >
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <View style={styles.iconWrapper}>{icon}</View>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>{name}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.accent,
    height: 110,
    borderRadius: 10,
    padding: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  iconContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  labelContainer: {
    width: "100%",
    paddingVertical: 6,
  },
  labelText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});
