import { StyleSheet, Text, View, FlatList, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import ThemedBackground from "@/components/ThemedBackground";
import ReceiptCard from "@/components/cards/ReceiptCard";
import client from "@/connection/client";
import { useSelector } from "react-redux";

interface ReceiptType {
  id: number;
  jamiat_id: number;
  family_id: string;
  receipt_no: string;
  date: string;
  its: string;
  folio_no: string;
  name: string;
  sector_id: number;
  sub_sector_id: number;
  amount: number;
  mode: string;
  bank_name: string | null;
  cheque_no: string | null;
  cheque_date: string | null;
  ifsc_code: string | null;
  transaction_id: string | null;
  transaction_date: string | null;
  year: string;
  comments: string;
  status: string;
  cancellation_reason: string | null;
  collected_by: string | null;
  log_user: string;
  attachment: string | null;
  payment_id: string | null;
}

const Receipts = () => {
  const [loading, setLoading] = useState(false);
  const [receipts, setReceipts] = useState<ReceiptType[]>([]);

  const token = useSelector((state: any) => state.user.token);
  const familyId = useSelector((state: any) => state.user.family_id);

  useEffect(() => {
    fetchReceipts();
  }, []);

  const fetchReceipts = async (): Promise<void> => {
    setLoading(true);
    try {
      let { data: res, status } = await client.post(
        "/receipts/by_family_ids",
        {
          family_ids: [familyId],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (status === 200) {
        setReceipts(res.data);
      } else {
        // ShowMessage({ message: "Failed to fetch receipts", error: 1 });
      }
    } catch (e) {
      console.log(e);
      // ShowMessage({
      //   message: "Error fetching receipts. Please try again later.",
      //   error: 1,
      // });
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: ReceiptType }) => (
    <ReceiptCard receipt={item} />
  );

  return (
    <ThemedBackground>
      <View style={styles.container}>
        <FlatList
          data={receipts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 10,
            paddingVertical: 10,
            gap: 10,
          }}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              {!loading && "No receipts found."}
            </Text>
          }
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={fetchReceipts} />
          }
        />
      </View>
    </ThemedBackground>
  );
};

export default Receipts;

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
