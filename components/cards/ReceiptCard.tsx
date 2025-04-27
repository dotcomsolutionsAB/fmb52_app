import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface ReceiptProps {
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

export default function ReceiptCard({ receipt }: { receipt: ReceiptProps }) {
  // Format date from YYYY-MM-DD to DD/MM/YYYY
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  // Format ITS number to show only last 4 digits
  const formatITS = (its: string) => {
    if (!its) return "";
    // If ITS is less than 4 characters, return as is
    if (its.length <= 4) return its;
    // Otherwise mask all but last 4 digits
    return `${its
      .substring(0, its.length - 4)
      .replace(/./g, "X")}${its.substring(its.length - 4)}`;
  };

  // Get sector/subsector info as a string
  const getSectorInfo = () => {
    // This is a placeholder - you might want to fetch actual sector names from your API
    // For now, just showing the IDs
    return `Sector ${receipt.sector_id}-${receipt.sub_sector_id}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.profileContainer}>
          <Image
            source={require("@/assets/images/profile.png")}
            style={{ borderRadius: 5 }}
          />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.nameText}>{receipt.name}</Text>
          <View style={styles.infoRow}>
            <View style={styles.leftColumn}>
              <Text style={styles.subImpText}>
                ITS : {formatITS(receipt.its)}
              </Text>
              <Text style={styles.subImpText}>
                Date : {formatDate(receipt.date)}
              </Text>
              <Text style={styles.amountText}>Amount : {receipt.amount}</Text>
            </View>
            <View style={styles.rightColumn}>
              <Text style={styles.subImpText}>{getSectorInfo()}</Text>
              <Text style={styles.modeText}>
                {receipt.mode.charAt(0).toUpperCase() + receipt.mode.slice(1)}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.downloadButton}>
        <Ionicons
          name="download-outline"
          size={24}
          color={Colors.light.white}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.light.white,
    borderWidth: 1,
    borderRadius: 10,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderColor: Colors.light.accent,
    padding: 10,
    gap: 7,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profileContainer: {
    gap: 10,
  },
  detailsContainer: {
    flex: 1,
    gap: 10,
    justifyContent: "center",
  },
  nameText: {
    fontSize: 16,
  },
  infoRow: {
    flexDirection: "row",
  },
  leftColumn: {
    flex: 1,
    gap: 3,
  },
  rightColumn: {
    flex: 1,
    alignItems: "flex-end",
    gap: 3,
  },
  subImpText: {
    fontSize: 14,
    color: "#777",
  },
  amountText: {
    fontSize: 14,
    color: Colors.light.accent,
    fontWeight: "600",
  },
  modeText: {
    fontSize: 16,
    color: Colors.light.accent,
    fontWeight: "bold",
  },
  downloadButton: {
    backgroundColor: Colors.light.alert,
    padding: 10,
    borderEndEndRadius: 10,
    borderTopEndRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});