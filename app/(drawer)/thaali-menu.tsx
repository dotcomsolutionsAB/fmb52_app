import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import ThemedBackground from "@/components/ThemedBackground";
import MenuCard from "@/components/cards/MenuCard";
import MenuHeader from "@/components/headers/MenuHeader";
import client from "@/connection/client";
import { useSelector } from "react-redux";
import ThaaliCard from "@/components/cards/ThaaliCard";

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
  const [taking_thaali, settaking_thaali] = useState("Yes");
  const onTakingThaaliChange = () => {
    if (taking_thaali === "Yes") {
      settaking_thaali("No");
    } else {
      settaking_thaali("Yes");
    }
  };
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
  const formatHijriDate = (dateString: string | undefined): string => {
    if (!dateString) return "N/A";

    // Split the date string to extract components
    const parts = dateString.split(" ");

    // Check if we have enough parts
    if (parts.length < 3) return dateString;

    // Extract the day and month
    const day = parts[0];
    const month = parts[1];

    // Map for Arabic month names
    const arabicMonths: Record<string, string> = {
      Muharram: "محرم",
      Safar: "صفر",
      "Rabi-ul-Awwal": "ربيع الأول",
      "Rabi-ul-Akhir": "ربيع الثاني",
      "Jumada-ul-Awwal": "جمادى الأولى",
      "Jumada-ul-Akhir": "جمادى الآخرة",
      Rajab: "رجب",
      Shaban: "شعبان",
      Ramadan: "رمضان",
      Shawwal: "شوال",
      Zilqadah: "ذو القعدة",
      Zilhijjah: "ذو الحجة",
    };

    // Map for Arabic numerals
    const arabicNumerals: Record<string, string> = {
      "0": "٠",
      "1": "١",
      "2": "٢",
      "3": "٣",
      "4": "٤",
      "5": "٥",
      "6": "٦",
      "7": "٧",
      "8": "٨",
      "9": "٩",
    };

    // Convert day to Arabic numerals
    const arabicDay = day
      .split("")
      .map((digit) => arabicNumerals[digit] || digit)
      .join("");

    // Get Arabic month name
    const arabicMonth = arabicMonths[month] || month;

    // Return formatted string with Arabic text direction
    return `${arabicDay} ${arabicMonth}`;
  };

  const renderItem = ({ item }: { item: MenuItemType }) => {
    const formattedItem = formatMenuData(item);
    return (
      <View style={{ width: "100%", paddingHorizontal: 10 }}>
        <ThaaliCard
          menu={formattedItem.menu}
          english_date={formattedItem.date}
          arabic_date={formatHijriDate(item.hijri_date)}
          day={formattedItem.day}
          rsv_end_time={"8:00 PM"}
          thaali_size={taking_thaali}
          onThaaliSizeChange={onTakingThaaliChange}
          salwat_chitti={"None"}
        />
      </View>

      // <MenuCard
      //   day={formattedItem.day}
      //   date={formattedItem.date}
      //   arabicDate={formatHijriDate(formattedItem.arabicDate)}
      //   menu={formattedItem.menu}
      //   rsvEndsTime={formattedItem.rsvEndsTime}
      // />
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
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={
            <MenuHeader
              name={"Shk Abbas bhai Saifuddin bhai Jamali"}
              role={"Distribution Area - Sub Incharge"}
            />
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              {!loading && "No menu available for this week"}
            </Text>
          }
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={fetchWeeklyMenu} />
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
    // paddingHorizontal:10
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
});

export default Thaali;
