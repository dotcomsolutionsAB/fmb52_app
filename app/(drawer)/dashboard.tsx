import { Image, ScrollView, StyleSheet, Text, View, Dimensions, TouchableOpacity, FlatList, ActivityIndicator, Alert } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ThemedBackground from "@/components/ThemedBackground";
import UserDashboardCard from "@/components/cards/UserDashboardCard";
import Carousel, { Pagination } from 'react-native-reanimated-carousel';
import MasoolCard from "@/components/cards/MasoolCard";
import ThaaliCard from "@/components/cards/ThaaliCard";
import ReceiptCard from "@/components/cards/ReceiptCard";
import QuickAccessCard from "@/components/cards/QuickAccessCard"
import { Colors } from "@/constants/Colors";
import client from "@/connection/client";
import { useSelector } from "react-redux";
import { RefreshControl } from "react-native-gesture-handler";
import { Feather, Ionicons, MaterialCommunityIcons,FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
const { width } = Dimensions.get('window');
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
  const [taking_thaali, setTakingThaali] = useState('Yes');
  const [thaali_size, setThaaliSize] = useState('Full');
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const familyId = useSelector((state: any) => state.user.family_id);
  const token = useSelector((state: any) => state.user.token);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatEnglishDate = (dateString: string | undefined): string => {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) return dateString;
    
    // Array of month names
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
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
  if (!dateString) return 'N/A';
  
  // Split the date string to extract components
  const parts = dateString.split(' ');
  
  // Check if we have enough parts
  if (parts.length < 3) return dateString;
  
  // Extract the day and month
  const day = parts[0];
  const month = parts[1];
  
  // Map for Arabic month names
  const arabicMonths: Record<string, string> = {
    'Muharram': 'محرم',
    'Safar': 'صفر',
    'Rabi-ul-Awwal': 'ربيع الأول',
    'Rabi-ul-Akhir': 'ربيع الثاني',
    'Jumada-ul-Awwal': 'جمادى الأولى',
    'Jumada-ul-Akhir': 'جمادى الآخرة',
    'Rajab': 'رجب',
    'Shaban': 'شعبان',
    'Ramadan': 'رمضان',
    'Shawwal': 'شوال',
    'Zilqadah': 'ذو القعدة',
    'Zilhijjah': 'ذو الحجة'
  };
  
  // Map for Arabic numerals
  const arabicNumerals: Record<string, string> = {
    '0': '٠',
    '1': '١',
    '2': '٢',
    '3': '٣',
    '4': '٤',
    '5': '٥',
    '6': '٦',
    '7': '٧',
    '8': '٨',
    '9': '٩'
  };
  
  // Convert day to Arabic numerals
  const arabicDay = day.split('').map(digit => 
    arabicNumerals[digit] || digit
  ).join('');
  
  // Get Arabic month name
  const arabicMonth = arabicMonths[month] || month;
  
  // Return formatted string with Arabic text direction
  return `${arabicDay} ${arabicMonth}`;
};
  
  const getData = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: res, status } = await client.post('/dashboard', {
        family_id: familyId,
        date: getTodayDate()
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (status === 200) {
        if (res.status === true) {
          console.log("Dashboard data:", res.data);
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
  }
  
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    // Set the thaali status based on API response when data is loaded
    if (dashboardData?.hub?.thali_status) {
      setTakingThaali(dashboardData.hub.thali_status === 'taking' ? 'Yes' : 'No');
    }
  }, [dashboardData]);
  
  const onTakingThaaliChange = () => {
    if (taking_thaali === 'Yes') {
      setTakingThaali('No');
    } else {
      setTakingThaali('Yes');
    }
  };
  
  const onThaaliSizeChange = () => {
    if (thaali_size === 'Full') {
      setThaaliSize('Half');
    } else {
      setThaaliSize('Full');
    }
  }
  
  const routes = [
    { key: 1, title: "Thaali Menu", route: 'thaali-menu',icon:<MaterialCommunityIcons name="dome-light" size={40} /> },
    { key: 2, title: "Receipts", route: 'receipts',icon:<Ionicons name="receipt-outline" size={40} /> },
    { key: 3, title: "Feedback", route: "feedback",icon:<Feather name="edit" size={40} /> },
    { key: 4, title: "Edit Profile", route: "edit_profile",icon:<Feather name="edit" size={40} />},
    { key: 5, title: "Notification", route: "notifications",icon:<Ionicons name="notifications-outline" size={40} /> },
  ];

  // Format today's menu for display
  const formatTodayMenu = () => {
    if (!dashboardData?.menu || dashboardData.menu.length === 0) {
      return 'No menu available for today';
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
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={getData}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </ThemedBackground>
    );
  }
 
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
                    source={require('../../assets/images/Banner.png')}
                    resizeMode="cover"
                  />
                </View>
              );
            }}
          />
        </View>
        
        <Image style={{ width: '100%', height: 20 }} source={require('../../assets/images/golden_strip.png')} />
        
        {/* Masool Card */}
        <MasoolCard
          masool_name={dashboardData?.hub?.masool || 'Not Available'}
        />
        
        {/* Thaali Card */}
        <View style={{ width: '100%', paddingHorizontal: 15 }}>
          <ThaaliCard
            thaali_size={thaali_size} 
            onThaaliSizeChange={onThaaliSizeChange} 
            menu={formatTodayMenu()} 
           
            english_date={formatEnglishDate(dashboardData?.menu?.[0]?.date) || 'N/A'} 
            arabic_date={formatHijriDate(dashboardData?.menu?.[0]?.hijri_date) || 'N/A'} 
            day={dashboardData?.menu?.[0]?.day_name || 'N/A'} 
            rsv_end_time={'8:00 PM'} 
          /> 
        </View>
        
        <View style={{ width: '100%', paddingHorizontal: 15, marginTop: 15 }}>
          {/* User Dashboard Card with Hub data */}
          <UserDashboardCard 
            name={dashboardData?.hub?.masool || 'Not Available'}
            sector={ (dashboardData?.hub?.sector_name || 'N/A')}
            subsector={ (dashboardData?.hub?.subsector_name || 'N/A')}
            hub={(formatCurrency(dashboardData?.hub?.hub_amount )|| 'N/A')}
            paid={ (formatCurrency(dashboardData?.hub?.paid_amount) || 0)}
           
          />
          
          {/* Recent Receipts Section */}
          <View style={{ paddingVertical: 15 }}>
            <View style={{ width: "100%", padding: 10, backgroundColor: Colors.light.accent, borderTopEndRadius: 10, borderTopStartRadius: 10 }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Recent Receipts</Text>
            </View>
            
            {!dashboardData?.receipts || dashboardData.receipts.length === 0 ? (
              <View style={styles.emptyStateContainer}>
                <Text style={styles.emptyStateText}>No receipts available</Text>
              </View>
            ) : (
              dashboardData.receipts.slice(0, 4).map((receipt, index) => (
                <ReceiptCard 
                  key={receipt.id} 
                  receipt={receipt}
                   sector={ (dashboardData?.hub?.sector_name || 'N/A')}
                  subsector={ (dashboardData?.hub?.subsector_name || 'N/A')}
                  innerCardStyle={{ gap: 0 }} 
                  fontSize={13} 
                  customStyle={{ 
                    borderRadius: 0, 
                    borderColor: 'lightgray',
                    borderBottomWidth: index === dashboardData.receipts.length - 1 ? 0 : 1
                  }} 
                  buttonStyle={{ 
                    borderEndEndRadius: 0,
                    borderTopEndRadius: 0,
                    borderBottomWidth: 1,
                    borderColor: 'lightgray'
                  }}
                />
              ))
            )}
            
            <TouchableOpacity onPress={() => {router.push('receipts')}} style={{ width: '100%', backgroundColor: "white", borderBottomEndRadius: 10, borderBottomStartRadius: 10, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
              <Text style={{ color: '#1976D2', fontSize: 16, fontWeight: 'bold' }}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {/* Quick Access Section */}
          <Text style={{ color: 'grey', fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Quick Access</Text>
          <View style={styles.quickAccessContainer}>
            {routes.map((route, index) => (
              <View key={index} style={styles.quickAccessItem}>
                <QuickAccessCard icon={route.icon} name={route.title} route={route.route} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ThemedBackground>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignSelf: "stretch" 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.light.text,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: Colors.light.accent,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyStateContainer: {
    backgroundColor: 'white',
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    color: Colors.light.text,
    fontSize: 14,
  },
  carouselContent: {
    alignItems: 'center',
  },
  carouselContainer: {
    width: '100%',
    height: BANNER_HEIGHT,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerSlide: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginTop: 10,
    backgroundColor: 'white',
    paddingHorizontal: 5,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    resizeMode: 'stretch',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: "yellow",
    width: 20,
  },
  quickAccessContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 15,
    gap: 10
  },
  quickAccessItem: {
    width: CARD_WIDTH,
    marginBottom: 10,
  },
});