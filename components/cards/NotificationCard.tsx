import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  Modal,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";

// Define the notification interface
export interface Notification {
  id: string | number;
  // Old API fields
  Title?: string;
  Dated?: string;
  Description?: string;
  Image_Url?: string;
  Button_Text?: string;
  Button_Url?: string;

  // New API fields
  title?: string;
  msg?: string;
  image?: string;
  created_at?: string;
  button_title?: string;
  button_link?: string;
}

interface NotificationCardProps {
  notification: Notification;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [imageExpanded, setImageExpanded] = useState(false);

  // Function to format the date
  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    const hours = date.getHours() % 12 || 12;
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "PM" : "AM";

    return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
  };

  // Get title, message, image, and date based on whichever API format is used
  const title = notification.title || notification.Title || "";
  const message = notification.msg || notification.Description || "";
  const imageUrl = notification.image || notification.Image_Url;
  const buttonTitle = notification.button_title || notification.Button_Text;
  const buttonLink = notification.button_link || notification.Button_Url;

  // Parse the date from either API format
  let formattedDate = "";

  if (notification.created_at) {
    // Parse ISO 8601 date format
    const date = new Date(notification.created_at);
    formattedDate = formatDate(date);
  } else if (notification.Dated) {
    // Parse the date from the string format with /Date(...)/ pattern
    const date = new Date(
      parseInt(notification.Dated.match(/\d+/)?.[0] || "0")
    );
    formattedDate = formatDate(date);
  }

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const toggleImageExpanded = () => {
    setImageExpanded(!imageExpanded);
  };

  async function openUrl(url: string) {
    await Linking.openURL(url).catch((err) =>
      console.error("An error occurred opening URL:", err)
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
      {imageUrl && (
        <TouchableOpacity onPress={toggleImageExpanded}>
          <View style={styles.expandIcon}>
            <Ionicons name="expand" size={22} color="black" />
          </View>
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
      <Text
        style={[
          styles.description,
          { marginBottom: message.length < 100 ? 15 : 0 },
        ]}
      >
        {expanded
          ? message
          : message.length > 100
          ? `${message.substring(0, 100)}...`
          : message}
      </Text>
      {message.length > 100 && (
        <TouchableOpacity onPress={toggleExpanded}>
          <Text style={styles.readMore}>
            {expanded ? "Read Less" : "Read More..."}
          </Text>
        </TouchableOpacity>
      )}
      {buttonLink && (
        <TouchableOpacity
          onPress={() => openUrl(buttonLink)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{buttonTitle || "Open Link"}</Text>
        </TouchableOpacity>
      )}

      <Modal
        visible={imageExpanded}
        transparent={true}
        onRequestClose={toggleImageExpanded}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={toggleImageExpanded}
          >
            <AntDesign name="close" size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <Image
            source={{ uri: imageUrl }}
            style={styles.expandedImage}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </View>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  card: {
    width: "93%",
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1.9,
    borderColor: Colors.light.accent,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
    marginVertical: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
  },
  expandIcon: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 16,
    padding: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.light.accent,
    padding: 15,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#fff",
    flex: 1,
  },
  date: {
    fontStyle: "italic",
    fontWeight: "500",
    color: "#fff",
    fontSize: 13,
    marginLeft: 10,
  },
  description: {
    marginTop: 14,
    fontSize: 15,
    color: "#000",
    fontWeight: "500",
    paddingHorizontal: 15,
  },
  readMore: {
    marginTop: 10,
    color: "#555",
    fontWeight: "900",
    paddingHorizontal: 15,
    paddingBottom: 15,
    textDecorationLine: "underline",
  },
  button: {
    marginHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: Colors.light.accent,
    borderRadius: 4,
    padding: 10,
    alignItems: "center",
    backgroundColor: "rgba(92, 70, 4, 0.04)",
  },
  buttonText: {
    color: Colors.light.accent,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCloseButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
  expandedImage: {
    width: "100%",
    height: "80%",
  },
});
