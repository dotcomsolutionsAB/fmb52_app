import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";

const backgroundImage = require("@/assets/images/background.png");

const ThemedBackground = ({ children }) => {
  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
      {children}
    </ImageBackground>
  );
};

export default ThemedBackground;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
