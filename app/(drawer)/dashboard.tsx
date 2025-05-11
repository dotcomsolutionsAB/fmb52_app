import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  TextInput,
  PermissionsAndroid,
} from "react-native";
import React, { useEffect, useRef, useState, useCallback } from "react";
import ThemedBackground from "@/components/ThemedBackground";
import UserDashboardCard from "@/components/cards/UserDashboardCard";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import MasoolCard from "@/components/cards/MasoolCard";
import ThaaliCard from "@/components/cards/ThaaliCard";
import ReceiptCard from "@/components/cards/ReceiptCard";
import QuickAccessCard from "@/components/cards/QuickAccessCard";
import RoundedButton from "@/components/buttons/RoundedButton";
import FeedbackModal from "./FeedbackModal";
import { Colors } from "@/constants/Colors";
import client from "@/connection/client";
import { useSelector } from "react-redux";
import { RefreshControl } from "react-native-gesture-handler";
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import { Slider } from "@miblanchard/react-native-slider";
import { launchImageLibrary } from "react-native-image-picker";
import { router } from "expo-router";
const { width } = Dimensions.get("window");
const BANNER_WIDTH = width;
const BANNER_HEIGHT = 120;
const CARD_WIDTH = (width - 50) / 3;

// Define types for our API response
interface Receipt {
  id: number;
  receipt_no: string;
  date: string;
  name: string;
  amount: number;
  mode: string;
  status: string;
}

interface Hub {
  masool: string;
  hub_amount: number;
  paid_amount: number;
  due_amount: number;
  thali_status: string;
  sector_name: string;
  subsector_name: string;
}

interface Menu {
  date: string;
  hijri_date: string;
  day_name: string;
  menu: string;
  addons: string;
}

interface DashboardData {
  receipts: Receipt[];
  hub: Hub;
  menu: Menu[];
}

const Dashboard = () => {
  const ref = useRef(null);
  const [taking_thaali, setTakingThaali] = useState("Yes");
  const [thaali_size, setThaaliSize] = useState("Full");
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const familyId = useSelector((state: any) => state.user.family_id);
  const token = useSelector((state: any) => state.user.token);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Feedback modal and form states
  const [feedbackModalVisible, setFeedbackModalVisible] = useState(false);
  const [tasteRating, setTasteRating] = useState(1);
  const [quantityRating, setQuantityRating] = useState(1);
  const [overallQualityRating, setOverallQualityRating] = useState(1);
  const [comments, setComments] = useState("");
  const [feedbackImages, setFeedbackImages] = useState<any[]>([]);
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);
  const [foodTags, setFoodTags] = useState({
    Too_spicy: false,
    Too_oily: false,
  });
  const userId = useSelector((state: any) => state.user.id);
  const jamiatId = useSelector((state: any) => state.user.jamiat_id);
  const maxImages = 7;

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };
  const formatCurrency = (amount: number | undefined) => {
    if (amount === undefined) return "N/A";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatEnglishDate = (dateString: string | undefined): string => {
    if (!dateString) return "N/A";

    try {
      const date = new Date(dateString);

      // Check if date is valid
      if (isNaN(date.getTime())) return dateString;

      // Array of month names
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      // Get day and month name
      const day = date.getDate();
      const month = months[date.getMonth()];

      // Return formatted date
      return `${day} ${month}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
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

  const getData = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: res, status } = await client.post(
        "/dashboard",
        {
          family_id: familyId,
          date: getTodayDate(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (status === 200) {
        if (res.status === true) {
          setDashboardData(res.data);
        } else {
          setError(res.message || "Failed to load dashboard data");
        }
      } else {
        setError("Server error. Please try again later.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching data");
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    // Set the thaali status based on API response when data is loaded
    if (dashboardData?.hub?.thali_status) {
      setTakingThaali(
        dashboardData.hub.thali_status === "taking" ? "Yes" : "No"
      );
    }
  }, [dashboardData]);

  const onTakingThaaliChange = () => {
    if (taking_thaali === "Yes") {
      setTakingThaali("No");
    } else {
      setTakingThaali("Yes");
    }
  };

  const onThaaliSizeChange = () => {
    if (thaali_size === "Full") {
      setThaaliSize("Half");
    } else {
      setThaaliSize("Full");
    }
  };

  const routes = [
    {
      key: 1,
      title: "Thaali Menu",
      route: "/(drawer)/thaali-menu",
      icon: (
        <MaterialCommunityIcons
          name="food-variant"
          size={35}
          color={Colors.light.accent}
        />
      ),
    },
    {
      key: 2,
      title: "Receipts",
      route: "/(drawer)/receipts",
      icon: (
        <Ionicons
          name="receipt-outline"
          size={35}
          color={Colors.light.accent}
        />
      ),
    },
    {
      key: 3,
      title: "Feedback",
      route: "/(drawer)/feedback",
      icon: (
        <MaterialIcons name="feedback" size={35} color={Colors.light.accent} />
      ),
    },
    {
      key: 4,
      title: "Edit Profile",
      route: "/(drawer)/edit_profile",
      icon: (
        <FontAwesome5 name="user-edit" size={35} color={Colors.light.accent} />
      ),
    },
    {
      key: 5,
      title: "Notification",
      route: "/(drawer)/notifications",
      icon: (
        <Ionicons
          name="notifications-outline"
          size={35}
          color={Colors.light.accent}
        />
      ),
    },
    {
      key: 6,
      title: "Payments",
      route: "/(drawer)/payments",
      icon: (
        <MaterialIcons name="payment" size={35} color={Colors.light.accent} />
      ),
    },
  ];

  // Format today's menu for display
  const formatTodayMenu = () => {
    if (!dashboardData?.menu || dashboardData.menu.length === 0) {
      return "No menu available for today";
    }

    const todayMenu = dashboardData.menu[0];
    let menuText = todayMenu?.menu;

    if (todayMenu?.addons) {
      menuText += `, ${todayMenu?.addons}`;
    }

    return menuText;
  };

  // Show loading or error state
  if (loading) {
    return (
      <ThemedBackground>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.light.accent} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </ThemedBackground>
    );
  }
  // Show error state if there's an error and no data

  if (error && !dashboardData) {
    return (
      <ThemedBackground>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={getData}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </ThemedBackground>
    );
  }

  const toggleTag = (tag: "Too_spicy" | "Too_oily") => {
    setFoodTags((prev) => ({
      ...prev,
      [tag]: !prev[tag],
    }));
  };

  const requestGalleryPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        {
          title: "Gallery Permission",
          message: "App needs access to your gallery to upload images",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const pickImage = async () => {
    const hasPermission = await requestGalleryPermission();

    const options = {
      mediaType: "photo" as const,
      selectionLimit: maxImages - feedbackImages.length,
      quality: 1 as const,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        return;
      }

      if (response.errorCode) {
        alert("ImagePicker Error: " + response.errorMessage);
        return;
      }

      if (response.assets) {
        if (feedbackImages.length + response.assets.length > maxImages) {
          alert("You can only upload up to " + maxImages + " images");
          return;
        }
        setFeedbackImages([...feedbackImages, ...response.assets]);
      }
    });
  };

  const removeImage = (index: number) => {
    const newImages = [...feedbackImages];
    newImages.splice(index, 1);
    setFeedbackImages(newImages);
  };

  const submitFeedback = async () => {
    // Validate required fields
    if (
      !quantityRating ||
      !tasteRating ||
      !overallQualityRating ||
      !comments ||
      comments.trim().length === 0
    ) {
      alert("Please fill all the required fields");
      return;
    }

    try {
      setSubmittingFeedback(true);

      try {
        const { data: menuRes, status: menuStatus } = await client.post(
          "/menus/by-date",
          {
            date: getTodayDate(),
          }
        );

        if (menuStatus !== 200 || !menuRes.menu || menuRes.menu.length === 0) {
          alert("Menu not found for today. Please try again later.");
          setSubmittingFeedback(false);
          return;
        }

        // Step 2: Prepare the form data for submission
        const formData = new FormData();
        const menuId = menuRes.menu[0].id;

        // We now use direct spicy and oily values instead of processing them into a string

        // Add all form fields - ensure all are strings
        formData.append("menu_id", String(menuId));
        formData.append("jamiat_id", String(jamiatId));
        formData.append("family_id", String(familyId));
        formData.append("user_id", String(userId));
        formData.append("food_taste", String(tasteRating));
        formData.append("food_quantity", String(quantityRating));
        formData.append("food_quality", String(overallQualityRating));

        // Instead of using "others", add spicy and oily as separate fields
        formData.append("spicy", foodTags.Too_spicy ? "1" : "0");
        formData.append("oily", foodTags.Too_oily ? "1" : "0");

        formData.append("date", getTodayDate());
        formData.append("remarks", comments);

        // Handle images properly - based on the API parameters, it expects "image" not "image[]"
        if (feedbackImages.length > 0) {
          // Use only the first image if multiple are selected (based on API params showing single image field)
          const image = feedbackImages[0];
          formData.append("image", {
            uri: image.uri,
            type: image.type || "image/jpeg",
            name: image.fileName || "feedback_image.jpg",
          } as any);
        }

        // Step 3: Submit feedback
        try {
          const response = await client.post("/feedbacks/add", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
            },
          });

          if (response.status === 200) {
            setFeedbackSuccess(true);
            setTimeout(() => {
              setFeedbackSuccess(false);
              setFeedbackModalVisible(false);
              resetFeedbackForm();
            }, 3000);
          } else {
            alert("Unexpected response from server. Please try again later.");
          }
        } catch (submitError: any) {
          console.log("Feedback submission error details:", submitError);

          if (submitError.response) {
            console.log("Error response status:", submitError.response.status);
            console.log(
              "Error response data:",
              JSON.stringify(submitError.response.data)
            );

            if (submitError.response.status === 422) {
              // Extract validation errors if available
              let validationMessage =
                "There was an error with your submission. Please check all fields.";

              if (submitError.response.data) {
                if (submitError.response.data.errors) {
                  try {
                    validationMessage = Object.entries(
                      submitError.response.data.errors
                    )
                      .map(([field, errors]) => {
                        const errorText = Array.isArray(errors)
                          ? errors.join(", ")
                          : typeof errors === "string"
                          ? errors
                          : "Invalid value";
                        return `${field}: ${errorText}`;
                      })
                      .join("\n");
                  } catch (parseError) {
                    console.log("Error parsing validation errors:", parseError);
                  }
                } else if (submitError.response.data.message) {
                  validationMessage = submitError.response.data.message;
                }
              }

              alert(`Validation Error: ${validationMessage}`);
            } else {
              alert(
                `Server Error (${submitError.response.status}): Please try again later.`
              );
            }
          } else if (submitError.request) {
            alert(
              "No response received from server. Please check your connection."
            );
          } else {
            alert(`Error: ${submitError.message || "Unknown error occurred"}`);
          }
        }
      } catch (menuError: any) {
        console.log("Error fetching menu:", menuError);
        alert("Failed to get today's menu. Please try again later.");
      }
    } catch (error: any) {
      console.log("Error in feedback process:", error.message || error);
      alert("An error occurred. Please try again later.");
    } finally {
      setSubmittingFeedback(false);
    }
  };

  const resetFeedbackForm = () => {
    setTasteRating(1);
    setQuantityRating(1);
    setOverallQualityRating(1);
    setComments("");
    setFeedbackImages([]);
    setFoodTags({
      Too_spicy: false,
      Too_oily: false,
    });
  };

  return (
    <ThemedBackground>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={getData}
            colors={[Colors.light.accent]}
            progressBackgroundColor={Colors.light.background}
          />
        }
      >
        {/* Banner Carousel */}
        <View style={styles.carouselContainer}>
          <Carousel
            ref={ref}
            width={BANNER_WIDTH}
            height={BANNER_HEIGHT}
            data={[1, 2, 3]}
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 50,
              parallaxAdjacentItemScale: 0.8,
            }}
            autoPlay
            autoPlayInterval={5000}
            loop
            renderItem={({ item }) => {
              return (
                <View style={styles.bannerSlide}>
                  <Image
                    style={styles.bannerImage}
                    source={require("../../assets/images/Banner.png")}
                    resizeMode="cover"
                  />
                </View>
              );
            }}
          />
        </View>

        <Image
          style={{ width: "100%", height: 20 }}
          source={require("../../assets/images/golden_strip.png")}
        />

        {/* Masool Card */}
        <MasoolCard
          masool_name={dashboardData?.hub?.masool || "Not Available"}
        />

        {/* Thaali Card */}
        <View style={{ width: "100%", paddingHorizontal: 15 }}>
          <ThaaliCard
            thaali_size={thaali_size}
            onThaaliSizeChange={onThaaliSizeChange}
            menu={formatTodayMenu()}
            english_date={
              formatEnglishDate(dashboardData?.menu?.[0]?.date) || "N/A"
            }
            arabic_date={
              formatHijriDate(dashboardData?.menu?.[0]?.hijri_date) || "N/A"
            }
            day={dashboardData?.menu?.[0]?.day_name || "N/A"}
            rsv_end_time={"8:00 PM"}
            salwat_chitti={""}
          />

          {/* Thaali Feedback Button */}
          <TouchableOpacity
            style={{
              backgroundColor: Colors.light.accent,
              paddingVertical: 12,
              borderRadius: 8,
              marginTop: 10,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
            onPress={() => setFeedbackModalVisible(true)}
          >
            <MaterialIcons
              name="feedback"
              size={22}
              color="white"
              style={{ marginRight: 8 }}
            />
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
              Give Thaali Feedback
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ width: "100%", paddingHorizontal: 15, marginTop: 15 }}>
          {/* User Dashboard Card with Hub data */}
          <UserDashboardCard
            name={dashboardData?.hub?.masool || "Not Available"}
            sector={dashboardData?.hub?.sector_name || "N/A"}
            hub={formatCurrency(dashboardData?.hub?.hub_amount)}
            paid={formatCurrency(dashboardData?.hub?.paid_amount) || "N/A"}
            subsector={dashboardData?.hub?.subsector_name || "N/A"}
          />

          {/* Recent Receipts Section */}
          <View style={{ paddingVertical: 15 }}>
            <View
              style={{
                width: "100%",
                padding: 10,
                backgroundColor: Colors.light.accent,
                borderTopEndRadius: 10,
                borderTopStartRadius: 10,
              }}
            >
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                Recent Receipts
              </Text>
            </View>

            {!dashboardData?.receipts || dashboardData.receipts.length === 0 ? (
              <View style={styles.emptyStateContainer}>
                <Text style={styles.emptyStateText}>No receipts available</Text>
              </View>
            ) : (
              dashboardData.receipts.slice(0, 4).map((receipt, index) => (
                <ReceiptCard
                  key={receipt.id}
                  receipt_no={receipt.receipt_no}
                  date={receipt.date}
                  name={receipt.name}
                  amount={receipt.amount}
                  mode={receipt.mode}
                  status={receipt.status}
                  sector={dashboardData?.hub?.sector_name || "N/A"}
                  subsector={dashboardData?.hub?.subsector_name || "N/A"}
                  innerCardStyle={{ gap: 0 }}
                  fontSize={13}
                  customStyle={{
                    borderRadius: 0,
                    borderColor: "lightgray",
                    borderBottomWidth:
                      index === dashboardData.receipts.length - 1 ? 0 : 1,
                  }}
                  buttonStyle={{
                    borderBottomRightRadius: 0,
                    borderTopRightRadius: 0,
                    borderBottomWidth: 1,
                    borderColor: "lightgray",
                  }}
                />
              ))
            )}

            <TouchableOpacity
              onPress={() => {
                router.push("/(drawer)/receipts");
              }}
              style={{
                width: "100%",
                backgroundColor: "white",
                borderBottomEndRadius: 10,
                borderBottomStartRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                padding: 10,
              }}
            >
              <Text
                style={{ color: "#1976D2", fontSize: 16, fontWeight: "bold" }}
              >
                View All
              </Text>
            </TouchableOpacity>
          </View>

          {/* Quick Access Section */}
          <Text
            style={{
              color: "grey",
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Quick Access
          </Text>
          <FlatList
            data={routes}
            numColumns={3}
            keyExtractor={(item) => item.key.toString()}
            scrollEnabled={false}
            contentContainerStyle={styles.quickAccessContainer}
            columnWrapperStyle={styles.quickAccessColumnWrapper}
            renderItem={({ item }) => (
              <View style={styles.quickAccessItem}>
                <QuickAccessCard
                  icon={item.icon}
                  name={item.title}
                  route={item.route}
                />
              </View>
            )}
          />
        </View>
      </ScrollView>

      {/* Feedback Modal */}
      <FeedbackModal
        visible={feedbackModalVisible}
        onClose={() => setFeedbackModalVisible(false)}
        tasteRating={tasteRating}
        setTasteRating={setTasteRating}
        quantityRating={quantityRating}
        setQuantityRating={setQuantityRating}
        overallQualityRating={overallQualityRating}
        setOverallQualityRating={setOverallQualityRating}
        comments={comments}
        setComments={setComments}
        feedbackImages={feedbackImages}
        setFeedbackImages={setFeedbackImages}
        submittingFeedback={submittingFeedback}
        feedbackSuccess={feedbackSuccess}
        foodTags={foodTags}
        toggleTag={toggleTag}
        pickImage={pickImage}
        removeImage={removeImage}
        submitFeedback={submitFeedback}
        maxImages={maxImages}
      />
    </ThemedBackground>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.light.black,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: Colors.light.accent,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyStateContainer: {
    backgroundColor: "white",
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyStateText: {
    color: Colors.light.grey,
    fontSize: 14,
  },
  carouselContent: {
    alignItems: "center",
  },
  carouselContainer: {
    width: "100%",
    height: BANNER_HEIGHT,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  bannerSlide: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginTop: 10,
    backgroundColor: "white",
    paddingHorizontal: 5,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    resizeMode: "stretch",
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: "yellow",
    width: 20,
  },
  quickAccessContainer: {
    flexDirection: "column",
    paddingBottom: 15,
  },
  quickAccessColumnWrapper: {
    justifyContent: "space-between",
    marginBottom: 10,
  },
  quickAccessItem: {
    width: CARD_WIDTH,
  },
  // Feedback form styles
  feedbackModalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  feedbackModalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  feedbackModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  feedbackModalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.light.accent,
  },
  feedbackRatingContainer: {
    width: "100%",
    marginTop: 15,
    marginBottom: 15,
  },
  feedbackRatingText: {
    color: "#CBA652",
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 15,
  },
  feedbackSliderContainer: {
    width: "100%",
    paddingHorizontal: 5,
  },
  feedbackInput: {
    width: "100%",
    marginTop: 20,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    color: "black",
    height: 120,
    textAlignVertical: "top",
    borderColor: "#CBA652",
    borderWidth: 1,
    fontSize: 15,
  },
  feedbackUploadButton: {
    borderWidth: 2,
    borderColor: "#CBA652",
    borderStyle: "dashed",
    borderRadius: 10,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  feedbackSubmitButton: {
    backgroundColor: Colors.light.accent,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  feedbackSubmitText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  feedbackSuccessContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  feedbackSuccessText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginTop: 20,
  },
  feedbackSuccessSubtext: {
    fontSize: 16,
    textAlign: "center",
    color: "grey",
    marginTop: 10,
  },
});
