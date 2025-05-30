import client from "@/connection/client";
import { Colors } from "@/constants/Colors";
import { signout } from "@/store/reducer/user";
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { router } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { Children } from "react";
import { StyleSheet, Image, View, Text, Alert } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { CommonActions } from '@react-navigation/native';
export default function () {
  //   useEffect(() => {
  //     setTimeout(() => {
  //       SplashScreen.hideAsync();
  //     }, 2000);
  //   }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={CustomDrawerContent}
        screenOptions={{
          drawerContentContainerStyle: styles.drawerContainer,
          drawerActiveTintColor: Colors.light.accent,
          drawerActiveBackgroundColor: Colors.light.white,
          drawerInactiveTintColor: Colors.light.white,
          drawerStyle: { backgroundColor: Colors.light.accent },
          drawerLabelStyle: styles.drawerLabelStyle,
          headerStyle: {
            backgroundColor: Colors.light.accent,
          },
          headerTitleStyle: { fontSize: 20 },
          headerTintColor: Colors.light.white,
        }}
      >
        <Drawer.Screen
          name="dashboard" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Dashboard",
            title: "Dashboard",
            drawerIcon: (props) => <Ionicons name="home-outline" {...props} />,
          }}
        />
        <Drawer.Screen
          name="thaali-menu" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Thaali Menu",
            title: "Menu",
            drawerIcon: (props) => (
              <MaterialCommunityIcons name="dome-light" {...props} />
            ),
          }}
        />
        <Drawer.Screen
          name="notifications" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Notifications",
            title: "Notifications",
            drawerIcon: (props) => (
              <Ionicons name="notifications-outline" {...props} />
            ),
          }}
        />
        {/* Feedback menu item commented out as requested
        <Drawer.Screen
          name="feedback" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Feedback",
            title: "Feedback",
            drawerIcon: (props) => <Feather name="edit" {...props} />,
          }}
        />
        */}
        <Drawer.Screen
          name="receipts" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Receipts",
            title: "Receipts",
            drawerIcon: (props) => (
              <Ionicons name="receipt-outline" {...props} />
            ),
          }}
        />
        {/* <Drawer.Screen
          name="pause-thaali" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Start & Stop Thaali",
            title: "Start & Stop Thaali",
            drawerIcon: (props) => (
              <Ionicons name="pause-circle-outline" {...props} />
            ),
          }}
        /> */}
        <Drawer.Screen
          name="edit_profile" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Edit Profile",
            title: "Edit Profile",
            drawerIcon: (props) => <Feather name="edit" {...props} />,
          }}
        />

        {/* Admin Screens start from here */}

        {/* <Drawer.Screen
          name="mumeneen"
          options={{
            drawerLabel: "Mumeneen",
            title: "Mumeneen",
            drawerIcon: (props) => <Ionicons name="man-outline" {...props} />,
          }}
        />
        <Drawer.Screen
          name="payments"
          options={{
            drawerLabel: "Payments",
            title: "Payments",
            drawerIcon: (props) => (
              <MaterialCommunityIcons name="bank-outline" {...props} />
            ),
          }}
        />
        <Drawer.Screen
          name="zabihat"
          options={{
            drawerLabel: "Zabihat",
            title: "Zabihat",
            drawerIcon: (props) => (
              <MaterialCommunityIcons name="star-circle-outline" {...props} />
            ),
          }}
        />
        <Drawer.Screen
          name="salwat-fateha" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Salwat & Fateha",
            title: "Salwat & Fateha",
            drawerIcon: (props) => (
              <MaterialCommunityIcons name="star-circle-outline" {...props} />
            ),
          }}
        />
        <Drawer.Screen
          name="niyaz" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Niyaz",
            title: "Niyaz",
            drawerIcon: (props) => (
              <MaterialCommunityIcons name="star-circle-outline" {...props} />
            ),
          }}
        />
        <Drawer.Screen
          name="all-receipts" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "All Receipts",
            title: "All Receipts",
            drawerIcon: (props) => (
              <Ionicons name="receipt-outline" {...props} />
            ),
          }}
        />
        <Drawer.Screen
          name="send-notification" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Send Notification",
            title: "Send Notification",
            drawerIcon: (props) => (
              <Ionicons name="notifications-outline" {...props} />
            ),
          }}
        />
        <Drawer.Screen
          name="transfer" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Transfer",
            title: "Transfer",
            drawerIcon: (props) => (
              <Ionicons name="swap-horizontal-sharp" {...props} />
            ),
          }}
        />
        <Drawer.Screen
          name="menu-change" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Thaali Menu Change",
            title: "Thaal Menu Change",
            drawerIcon: (props) => (
              <MaterialCommunityIcons name="dome-light" {...props} />
            ),
          }}
        /> */}
      </Drawer>
    </GestureHandlerRootView>
  );
}

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { state, descriptors, navigation } = props;

  const user = useSelector((state: any) => state.user);

  const dispatch = useDispatch();

// Navigate to a dedicated logout screen that handles the process safely
const signOutUser = () => {
  // Close the drawer first
  navigation.closeDrawer();
  
  // Navigate to the dedicated logout screen
  setTimeout(() => {
    router.replace('/(auth)/logout');
  }, 100);
};

  // Manually render the Drawer items
  const renderDrawerItem = (route: any, index: number) => {
    const { options } = descriptors[route.key];
    const isFocused = state.index === index;
    // Extract styles from screenOptions
    const screenOptions = descriptors[state.routes[state.index].key].options;

    // Styles from screenOptions
    const {
      drawerActiveTintColor,
      drawerActiveBackgroundColor,
      drawerInactiveTintColor,
      drawerInactiveBackgroundColor,
      drawerLabelStyle,
    } = screenOptions;

    return (
      <DrawerItem
        key={route.key}
        label={options.drawerLabel || route.name}
        icon={options.drawerIcon}
        focused={isFocused}
        onPress={() => navigation.navigate(route.name)}
        labelStyle={[drawerLabelStyle]}
        activeTintColor={drawerActiveTintColor}
        inactiveTintColor={drawerInactiveTintColor}
        activeBackgroundColor={drawerActiveBackgroundColor}
        inactiveBackgroundColor={drawerInactiveBackgroundColor}
      />
    );
  };

  return (
    <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
      <View
        style={{
          alignItems: "center",
          marginBottom: 15,
          borderRadius: 10,
          backgroundColor: Colors.light.primary,
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}
      >
        <Image
          source={require("@/assets/images/faiz.png")}
          style={{ width: 200 }}
          resizeMode="contain"
        />
      </View>

      {/* Render the first 5 items (was 6 before feedback was commented out) */}
      {state.routes
        .slice(0, 5)
        .map((route, index) => renderDrawerItem(route, index))}

      {/* {user.role === "jamiat_admin" && <SeparatorAdmin />} */}

      {/* Render the remaining items */}
      {/* {user.role === "jamiat_admin" &&
        state.routes
          .slice(6)
          .map((route, index) => renderDrawerItem(route, index + 7))} */}

      <DrawerItem
        onPress={() => {
          // Close the drawer first before showing the alert
          navigation.closeDrawer();
          
          // Wait for drawer animation to complete
          setTimeout(() => {
            Alert.alert("Logout", "Are you sure you want to logout?", [
              { text: "Yes", onPress: signOutUser },
              { text: "No" },
            ]);
          }, 100);
        }}
        label="Logout"
        icon={(props) => <MaterialCommunityIcons name="logout" {...props} />}
        inactiveTintColor={Colors.light.white}
        labelStyle={styles.drawerLabelStyle}
      />

      <View style={{ marginTop: 20, alignItems: "center", gap: 5 }}>
        <Text style={styles.accessiblityText}>Version : 1.1</Text>
        <Text style={styles.accessiblityText}>Proudly Powered By</Text>
        <Text style={[styles.accessiblityText, { fontWeight: "bold" }]}>
          Dot Com Solutions
        </Text>
      </View>
    </DrawerContentScrollView>
  );
}

const SeparatorAdmin = () => {
  return (
    <View
      style={{
        marginTop: 15,
        marginVertical: 7,
        flexDirection: "row",
        alignItems: "stretch",
        gap: 5,
      }}
    >
      <View
        style={{
          flex: 1,
          height: 1,
          alignSelf: "center",
          backgroundColor: Colors.light.primary,
        }}
      />
      <Text
        style={{
          textAlign: "center",
          fontSize: 16,
          fontWeight: "bold",
          color: Colors.light.white,
        }}
      >
        Admin Access
      </Text>
      <View
        style={{
          flex: 1,
          height: 1,
          alignSelf: "center",
          backgroundColor: Colors.light.primary,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  drawerLabelStyle: { fontWeight: "bold", fontSize: 16 },
  accessiblityText: { fontSize: 14, color: Colors.light.white },
});
