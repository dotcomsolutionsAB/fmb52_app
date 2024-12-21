import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import ThemedBackground from "@/components/ThemedBackground";
import MenuCard from "@/components/cards/MenuCard";

const Thaali = () => {
  return (
    <ThemedBackground>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1, gap: 10, padding: 10 }}
      >
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <MenuCard key={i} day="Today" />
          ))}
      </ScrollView>
    </ThemedBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignSelf: "stretch" },
});

export default Thaali;
