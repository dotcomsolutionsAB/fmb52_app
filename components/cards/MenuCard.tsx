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

interface MenuCardProps {
  day?: string;
}

export default function (params: MenuCardProps) {
  const [doExpand, setDoExpand] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{params.day}</Text>
      <View style={styles.subContainer}>
        <Image
          source={require("@/assets/images/faiz.png")}
          style={{ width: 100 }}
          resizeMode="contain"
        />
        <View style={{ flex: 1, alignItems: "center", gap: 5 }}>
          <Text style={styles.subtitle}>Dal Chawal Palidu</Text>
          <Text style={styles.subtext}>
            Niyaz by : Shk Abbas bhai Saifuddin bhai Jamali
          </Text>

          <TouchableOpacity
            style={{ alignSelf: "flex-end" }}
            onPress={() => setDoExpand((st) => !st)}
          >
            <Text style={styles.readMore}>
              {!doExpand ? "Read More" : "Read Less"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: Colors.light.accent,
    borderColor: Colors.light.accent,
    borderWidth: 1,
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.light.white,
    marginVertical: 5,
  },
  subContainer: {
    backgroundColor: Colors.light.white,
    flexDirection: "row",
    padding: 7,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.light.accent,
    fontWeight: "bold",
  },
  subtext: {
    fontSize: 15,
    fontWeight: "500",
    color: "darkgrey",
  },
  readMore: {
    color: Colors.light.alert,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
});
