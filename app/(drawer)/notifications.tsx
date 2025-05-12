import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import ThemedBackground from "@/components/ThemedBackground";
import NotificationCard, {
  Notification,
} from "@/components/cards/NotificationCard";
import client from "@/connection/client";
import { useSelector } from "react-redux";
import { Colors } from "@/constants/Colors";

const Notifications = () => {
  const [notifications, setNotifications] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = useSelector((state: any) => state.user.token);

  const getNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: res, status } = await client.get(
        "/notifications/view-all",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (status === 200) {
        setNotifications(res.data);
      } else {
        setError("Server error. Please try again later.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching data");
      console.error("Notification fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <ThemedBackground>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={Colors.light.accent} />
          <Text style={{ marginTop: 10, color: Colors.light.accent }}>
            Loading notifications...
          </Text>
        </View>
      ) : error ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Text style={{ color: "red", textAlign: "center", marginBottom: 15 }}>
            {error}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.light.accent,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 5,
            }}
            onPress={getNotifications}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={notifications || []}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <NotificationCard notification={item} />}
          contentContainerStyle={styles.listContent}
          style={{ width: "100%" }} // Added to ensure full width
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={getNotifications}
              colors={[Colors.light.accent]}
            />
          }
          ListEmptyComponent={
            <View style={{ padding: 20, alignItems: "center" }}>
              <Text style={{ color: Colors.light.grey }}>
                No notifications found
              </Text>
            </View>
          }
        />
      )}
    </ThemedBackground>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  listContent: {
    paddingTop: 12,
    paddingBottom: 20,
    paddingHorizontal: 0,
  },
});
