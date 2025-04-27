import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import ThemedBackground from "@/components/ThemedBackground";
import NotificationCard, {
  Notification,
} from "@/components/cards/NotificationCard";

const Notifications = () => {
  const sampleNotifications: Notification[] = [
    {
      id: "1",
      Title: "App Update Available",
      Dated: "/Date(1713196800000)/", // April 16, 2024
      Description:
        "We have released a new version of our app with improved performance and exciting new features. Update now to enjoy a better experience!",
      Image_Url: "https://picsum.photos/id/236/800/400",
      Button_Text: "Update Now",
      Button_Url: "https://example.com/update",
    },
    {
      id: "2",
      Title: "Holiday Schedule",
      Dated: "/Date(1713283200000)/", // April 17, 2024
      Description:
        "Please note that our support team will be unavailable during the upcoming holiday on April 25. For any urgent matters, please email emergency@example.com. Regular support hours will resume on April 26. We appreciate your understanding and wish you a pleasant holiday!",
      Button_Text: "View Calendar",
      Button_Url: "https://example.com/calendar",
    },
    {
      id: "3",
      Title: "Congratulations!",
      Dated: "/Date(1713369600000)/", // April 18, 2024
      Description:
        "You have completed all the challenges for this month. Keep up the good work!",
      Image_Url: "https://picsum.photos/id/1/800/400",
    },
    {
      id: "4",
      Title: "System Maintenance",
      Dated: "/Date(1713456000000)/", // April 19, 2024
      Description:
        "Our system will undergo scheduled maintenance from 2:00 AM to 5:00 AM EST on April 23. During this time, the app may be temporarily unavailable. We apologize for any inconvenience this may cause and thank you for your patience as we work to improve our services.",
      Button_Text: "Learn More",
      Button_Url: "https://example.com/maintenance",
    },
    {
      id: "5",
      Title: "New Feature: Dark Mode",
      Dated: "/Date(1713542400000)/", // April 20, 2024
      Description:
        "We've added dark mode to our app! You can now toggle between light and dark themes in your profile settings. This feature helps reduce eye strain during nighttime usage and conserves battery life on devices with OLED screens.",
      Image_Url: "https://picsum.photos/id/1010/800/400",
      Button_Text: "Try Dark Mode",
      Button_Url: "https://example.com/darkmode",
    },
  ];

  return (
    <ThemedBackground>
      <FlatList
        data={sampleNotifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotificationCard notification={item} />}
        contentContainerStyle={styles.listContent}
      />
    </ThemedBackground>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  listContent: {
    paddingTop: 12,
    paddingBottom: 20,
  },
});
