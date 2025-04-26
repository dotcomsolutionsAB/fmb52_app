import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import ThemedBackground from "@/components/ThemedBackground";
import MenuCard from "@/components/cards/MenuCard";
import MenuHeader from "@/components/headers/MenuHeader";
import client from "@/connection/client";
import { useSelector } from "react-redux";

interface MenuItemType {
  date: string;
  hijri_date: string;
  day_name: string;
  menu: string;
  addons: string;
  niaz_by: string;
  slip_names: string;
  category: string;
}

interface FormattedMenuItemType {
  day: string;
  date: string;
  arabicDate: string;
  menu: string;
  rsvEndsTime: string;
}

const Thaali = () => {
  const [weeklyMenu, setWeeklyMenu] = useState<MenuItemType[]>([]);
  const [loading, setLoading] = useState(false);

  const token = useSelector((state: any) => state.user.token);

  useEffect(() => {
    fetchWeeklyMenu();
  }, []);

  const formatDate = (date: Date): string => {
    const d = new Date(date);
    return d.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  const getCurrentDate = (): string => {
    const today = new Date();
    return formatDate(today);
  };

  const fetchWeeklyMenu = async (): Promise<void> => {
    setLoading(true);
    try {
      let { data: res, status } = await client.post(
        "/menus/by-week",
        {
          date: getCurrentDate(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (status === 200) {
        setWeeklyMenu(res.menus);
      } else {
        // ShowMessage({ message: res.data.message, error: 1 });
      }
    } catch (e) {
      console.log(e);
      // ShowMessage({
      //   message: "Error fetching menu. Please try again later.",
      //   error: 1,
      // });
    } finally {
      setLoading(false);
    }
  };

  const formatMenuData = (item: MenuItemType): FormattedMenuItemType => {
    // Convert API data format to the format expected by MenuCard
    const dateParts = item.date.split("-");
    const dateObj = new Date(item.date);
    const formattedDate = `${dateParts[2]} ${dateObj.toLocaleString("default", {
      month: "long",
    })}`;

    // Extract the Arabic date from the hijri_date string
    const arabicDate =
      item.hijri_date.split(" ")[0] + " " + item.hijri_date.split(" ")[1];

    // Combine menu and addons
    const menuText = item.addons ? `${item.menu}, ${item.addons}` : item.menu;

    // For RSV ends time, you might want to calculate this based on business logic
    // For now, using a placeholder
    const rsvEndsTime = "RSV Ends Tomorrow at 8:00 PM";

    return {
      day: item.day_name,
      date: formattedDate,
      arabicDate: arabicDate,
      menu: menuText,
      rsvEndsTime: rsvEndsTime,
    };
  };

  const renderItem = ({ item }: { item: MenuItemType }) => {
    const formattedItem = formatMenuData(item);
    return (
      <MenuCard
        day={formattedItem.day}
        date={formattedItem.date}
        arabicDate={formattedItem.arabicDate}
        menu={formattedItem.menu}
        rsvEndsTime={formattedItem.rsvEndsTime}
      />
    );
  };

  return (
    <ThemedBackground>
      <View style={styles.container}>
        <FlatList
          data={weeklyMenu}
          renderItem={renderItem}
          keyExtractor={(item) => item.date}
          contentContainerStyle={{ flexGrow: 1, gap: 15, paddingBottom: 20 }}
          ListHeaderComponent={
            <MenuHeader
              name={"Shk Abbas bhai Saifuddin bhai Jamali"}
              role={"Distribution Area - Sub Incharge"}
            />
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              {loading ? "Loading menu..." : "No menu available for this week"}
            </Text>
          }
        />
      </View>
    </ThemedBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
});

export default Thaali;
