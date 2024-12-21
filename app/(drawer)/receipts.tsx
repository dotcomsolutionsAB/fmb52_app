import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import ThemedBackground from "@/components/ThemedBackground";
import ReceiptCard from "@/components/cards/ReceiptCard";

const receipts = () => {
  return (
    <ThemedBackground>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 10,
          paddingVertical: 10,
          gap: 10,
        }}
      >
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <ReceiptCard key={i} />
          ))}
      </ScrollView>
    </ThemedBackground>
  );
};

export default receipts;

const styles = StyleSheet.create({
  container: { flex: 1, alignSelf: "stretch" },
});
