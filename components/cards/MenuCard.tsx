import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";

interface MenuCardProps {
  day: string;
  date: string;
  arabicDate: string;
  menu: string;
  rsvEndsTime: string;
}

export default function MenuCard({
  day,
  date,
  arabicDate,
  menu,
  rsvEndsTime,
}: MenuCardProps) {
  const [takingThaali, setTakingThaali] = useState(false);

  return (
    <View style={styles.container}>
      {/* Top section with date and thaali info */}
      <View style={styles.topSection}>
        {/* Date block */}
        <View style={styles.dateBlock}>
          <View style={styles.dateContainer}>
            <Text style={styles.arabicDate}>{arabicDate}</Text>
            <Text style={styles.date}>{date}</Text>
          </View>
          <View style={styles.dayContainer}>
            <Text style={styles.day}>{day}</Text>
          </View>
        </View>

        {/* Thaali info */}
        <View style={styles.thaaliInfoContainer}>
          <View style={styles.thaaliRow}>
            <Text style={styles.thaaliText}>Taking Thaali</Text>
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={[
                  styles.toggleButton,
                  !takingThaali && styles.toggleButtonActive,
                ]}
                onPress={() => setTakingThaali(false)}
              >
                <Text
                  style={[
                    styles.toggleText,
                    !takingThaali && styles.toggleTextActive,
                  ]}
                >
                  NO
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                style={[
                  styles.toggleButton,
                  takingThaali && styles.toggleButtonActive,
                ]}
                onPress={() => setTakingThaali(true)}
              >
                <Text
                  style={[
                    styles.toggleText,
                    takingThaali && styles.toggleTextActive,
                  ]}
                >
                  YES
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* RSV ends text */}
          <Text style={styles.rsvText}>{rsvEndsTime}</Text>
        </View>
      </View>

      {/* Bottom section with menu and size */}
      <View style={styles.bottomSection}>
        {/* Menu */}
        <Text style={styles.menuText}>{menu}</Text>

        {/* Size and Salwaat */}
        <View style={styles.sizeRow}>
          <TouchableOpacity activeOpacity={0.6} style={styles.salwaatContainer}>
            <Text style={styles.salwaatText}>Salwaat Chitti</Text>
            <View style={styles.linkIconContainer}>
              <Feather name="link" size={14} color={"#000"} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  topSection: {
    flexDirection: "row",
    backgroundColor: "#E8EAEA",
  },
  dateBlock: {
    width: 140,
    margin: 15,
    marginRight: 0,
    borderRadius: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#c4a053",
  },
  dateContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  arabicDate: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  date: {
    color: "#000",
    fontSize: 22,
    fontWeight: "bold",
  },
  dayContainer: {
    backgroundColor: "#c4a053",
    width: "100%",
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    alignItems: "center",
    paddingVertical: 4,
  },
  day: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  thaaliInfoContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  thaaliRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  thaaliText: {
    fontSize: 17,
    color: "#333",
    marginRight: 15,
  },
  toggleContainer: {
    flexDirection: "row",
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#ddd",
  },
  toggleButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  toggleButtonActive: {
    backgroundColor: "#c4a053",
  },
  toggleText: {
    fontSize: 8,
    color: "#666",
    fontWeight: "500",
  },
  toggleTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  rsvText: {
    fontSize: 17,
    color: "#333",
  },
  bottomSection: {
    paddingVertical: 15,
    backgroundColor: "#fff",
  },
  menuText: {
    fontSize: 18,
    color: "#c4a053",
    fontWeight: "600",
    marginBottom: 15,
  },
  sizeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sizeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sizeText: {
    fontSize: 16,
    color: "#333",
    marginRight: 15,
  },
  sizeToggleContainer: {
    flexDirection: "row",
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#ddd",
  },
  sizeButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  sizeButtonActive: {
    backgroundColor: "#c4a053",
  },
  sizeButtonText: {
    fontSize: 9,
    color: "#666",
    fontWeight: "500",
  },
  sizeButtonTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  salwaatContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  salwaatText: {
    color: "#000",
    fontSize: 14,
    marginRight: 5,
  },
  linkIconContainer: {
    paddingLeft: 1,
  },
  linkIcon: {
    fontSize: 18,
  },
});