import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import React from "react";
import ThemedBackground from "@/components/ThemedBackground";
import MenuCard from "@/components/cards/MenuCard";
import MenuHeader from "@/components/headers/MenuHeader";

const Thaali = () => {
  const menuData = [
    {
      day: "Monday",
      date: "21 April",
      arabicDate: "١٤ شوال",
      menu: "Chicken Tarkari, Roti, Dal Chawal Palidu",
      rsvEndsTime: "RSV Ends Tomorrow at 8:00 PM",
    },
    {
      day: "Tuesday",
      date: "21 April",
      arabicDate: "١٤ شوال",
      menu: "Chicken Tarkari, Roti, Dal Chawal Palidu",
      rsvEndsTime: "RSV Ends Tomorrow at 8:00 PM",
    },
    {
      day: "Wednesday",
      date: "21 April",
      arabicDate: "١٤ شوال",
      menu: "Chicken Tarkari, Roti, Dal Chawal Palidu",
      rsvEndsTime: "RSV Ends Tomorrow at 8:00 PM",
    },
  ];

  return (
    <ThemedBackground>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1, gap: 10 }}
      >
        <MenuHeader
          name={"Shk Abbas bhai Saifuddin bhai Jamali"}
          role={"Distribution Area - Sub Incharge"}
        />
        {menuData.map((item, index) => (
          <MenuCard
            key={index}
            day={item.day}
            date={item.date}
            arabicDate={item.arabicDate}
            menu={item.menu}
            rsvEndsTime={item.rsvEndsTime}
          />
        ))}
      </ScrollView>
    </ThemedBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
  },
});

export default Thaali;
