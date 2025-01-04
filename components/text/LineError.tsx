import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";

interface LineErrorParams {
  message: string;
}

export default function (params: LineErrorParams) {
  return (
    <View>
      <Text style={styles.error}>{params.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    color: Colors.light.alert,
    fontSize: 14,
    textAlign: "center",
  },
});
