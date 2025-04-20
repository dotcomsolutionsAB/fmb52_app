import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import ThemedBackground from "@/components/ThemedBackground";
import UserDashboardCard from "@/components/cards/UserDashboardCard";
import MenuCard from "@/components/cards/MenuCard";

const Dashboard = () => {
  return (
    <ThemedBackground>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={{ margin: 10 }}>
          <UserDashboardCard />
        </View>
        <View>
          <MenuCard
            day={"Monday"}
            date={"21 April"}
            arabicDate={"١٤ شوال"}
            menu={"Chicken Tarkari, Roti, Dal Chawal Palidu"}
            rsvEndsTime={"RSV Ends Tomorrow at 8:00 PM"}
          />
        </View>
      </ScrollView>
    </ThemedBackground>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: { flex: 1, alignSelf: "stretch" },
});
