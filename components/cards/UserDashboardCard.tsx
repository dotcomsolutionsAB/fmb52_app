import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

interface UserDashboardCardProps {
  name: string;
  sector: string;
  subsector: string;
  hub: string;
  paid: string;
}
const UserDashboardCard: React.FC<UserDashboardCardProps> = ({
  name,
  sector,
  subsector,
  hub,
  paid,
}) => {
  return (
    <View style={styles.container}>
      <View style={{ gap: 10 }}>
        <Image source={require("@/assets/images/profile.png")} />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: "#1976D2", fontSize: 16, fontWeight: "600" }}>
            HOF
          </Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, { color: "#808080", fontSize: 16 }]}>
          {name}
        </Text>
        <View style={{ height: 5 }} />
        <Text
          style={[
            styles.subtitle,
            { color: "#CBA652", fontSize: 16, fontWeight: "bold" },
          ]}
        >
          Sector: {sector}
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: "#CBA652", fontSize: 16, fontWeight: "bold" },
          ]}
        >
          Sub Sector : {subsector}
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={[
              styles.subtitle,
              { color: "#808080", fontSize: 16, fontWeight: "bold" },
            ]}
          >
            Hub: {hub}
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: "#27B124", fontSize: 16, fontWeight: "bold" },
            ]}
          >
            Paid : {paid}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default UserDashboardCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "white",
    padding: 10,
    gap: 10,
    borderWidth: 1,
    borderColor: "grey",
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  subtitle: {
    fontSize: 15,
    color: "black",
  },
});
