import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import CustomSwitch from "../buttons/CustomSwitch";
import { Link } from "expo-router";

interface MenuDashboardCardProps {
  english_date: string;
  arabic_date: string;
  menu: string;
  day: string;
  niaz_by?: string;
}

export default function MenuDashboardCard({
  english_date,
  arabic_date,
  menu,
  day,
  niaz_by,
}: MenuDashboardCardProps) {
  const [taking_thaali, settaking_thaali] = useState("Yes");
  const onTakingThaaliChange = () => {
    if (taking_thaali === "Yes") {
      settaking_thaali("No");
    } else {
      settaking_thaali("Yes");
    }
  };
  return (
    <View
      style={{
        width: "100%",
        borderRadius: 15,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#E8EAEA",
      }}
    >
      <View
        style={{
          width: "100%",
          padding: 10,
          borderRadius: 15,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderColor: "#CBA652",
          borderWidth: 1,
        }}
      >
        <View
          style={{
            backgroundColor: "#E8EAEA",
            borderRadius: 10,
            borderColor: "#CBA652",
            borderWidth: 1,
            height: 90,
            alignItems: "center",
            justifyContent: "center",
            width: 90,
          }}
        >
          <View
            style={{
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
              height: 60,
              width: "100%",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "black" }}>
              {arabic_date}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "black" }}>
              {english_date}
            </Text>
          </View>

          <View
            style={{
              width: "100%",
              backgroundColor: "#CBA652",
              height: 30,
              borderBottomEndRadius: 10,
              borderBottomStartRadius: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
                paddingVertical: 3,
              }}
            >
              {day}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            gap: 5,
            padding: 15,
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "600",
                color: "#CBA652",
                paddingLeft: 10,
              }}
            >
              {menu}
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.6}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
              paddingLeft: 10,
            }}
          >
            {niaz_by && (
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "600",
                  color: "gray",
                }}
              >
                Niyaz By: {niaz_by}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
