import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useDispatch } from 'react-redux';
import { signout } from '@/store/reducer/user';
import { router } from 'expo-router';

/**
 * This is a dedicated logout screen that safely handles the logout process
 * by separating navigation and state management concerns.
 */
export default function LogoutScreen() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Handle logout process
    const performLogout = async () => {
      try {
        // First dispatch the signout action to clear Redux state
        dispatch(signout());
        
        // Then navigate to login after a brief delay to ensure Redux state is updated
        setTimeout(() => {
          router.replace('/login');
        }, 300);
      } catch (error) {
        console.error('Error during logout:', error);
        // If there's an error, still try to navigate to login
        router.replace('/login');
      }
    };
    
    // Start the logout process
    performLogout();
  }, [dispatch]);
  
  // Show a loading screen while logout is processing
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.light.accent} />
      <Text style={styles.text}>Logging out...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: Colors.light.accent,
  },
});
