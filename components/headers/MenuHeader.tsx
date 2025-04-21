import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

interface MenuHeaderProps {
  name: string;
  role: string;
}

const MenuHeader = ({ name, role }: MenuHeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerSubContainer}>
        <Image
          source={require("@/assets/images/faiz.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{name}</Text>
          <Text style={styles.userRole}>{role}</Text>
        </View>
      </View>
      <Image
        source={require("@/assets/images/divider.png")}
        style={styles.stripImage}
        resizeMode="stretch"
      />
    </View>
  );
};

export default MenuHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    alignSelf: "stretch",
  },
  headerSubContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 15,
  },
  logo: {
    width: 130,
    height: 60,
  },
  userInfo: {
    flex: 1,
    paddingLeft: 15,
  },
  userName: {
    fontSize: 16,
    color: "#333",
  },
  userRole: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  stripImage: {
    width: "100%",
    height: 20,
  },
});
