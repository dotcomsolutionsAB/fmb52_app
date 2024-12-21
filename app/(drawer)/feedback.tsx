import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import ThemedBackground from "@/components/ThemedBackground";
import { ScrollView } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";
import UploadCard from "@/components/upload/UploadCard";
import RoundedButton from "@/components/buttons/RoundedButton";

const feedback = () => {
  return (
    <ThemedBackground>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1, padding: 10, gap: 10 }}
      >
        <Text style={styles.title}>Give Us Your Feedback</Text>
        <TextInput
          multiline={true}
          placeholder="Enter your feedback here..."
          numberOfLines={5}
          style={{
            backgroundColor: Colors.light.white,
            padding: 10,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: Colors.light.accent,
          }}
        />
        <View style={{ height: 20 }} />
        <Text style={styles.title}>Upload Screenshot</Text>
        <Text style={styles.subtitle}>
          You can upload screenshots to help us understand your feedback better.
          This is optional but highly appreciated.
        </Text>
        <UploadCard />
        <View style={{ height: 20 }} />
        <RoundedButton title="Submit Feedback" />
      </ScrollView>
    </ThemedBackground>
  );
};

export default feedback;

const styles = StyleSheet.create({
  container: { flex: 1, alignSelf: "stretch" },
  title: {
    fontSize: 20,
    color: Colors.light.accent,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "300",
    color: Colors.light.black,
  },
});
