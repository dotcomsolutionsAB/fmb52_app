import { StyleSheet, Text, View, ScrollView, Image, TextInput, ActivityIndicator, Alert } from "react-native";
import React, { useCallback, useState, useEffect } from "react";
import ThemedBackground from "@/components/ThemedBackground";
import { Colors } from "@/constants/Colors";
import RoundedButton from "@/components/buttons/RoundedButton";
import { useSelector } from "react-redux";
import client from "@/connection/client";

const primary = Colors.light.accent;

// Define the interface for profile data
interface ProfileData {
  id: number;
  username: string;
  role: string;
  family_id: string;
  status: string;
  its: string;
  name: string;
  email: string;
  jamiat_id: number;
  mobile: string;
  hof_its: string;
  its_family_id: string;
  folio_no: string;
  mumeneen_type: string;
  title: string | null;
  gender: string;
  age: number;
  sector_id: number;
  sub_sector_id: number;
  building: string;
  thali_status: string;
  photo_id: string | null;
}

// Skeleton component for loading state with theme colors
const SkeletonPlaceholder = ({ width, height, style }: { width: number | string, height: number | string, style?: any }) => {
  return (
    <View
      style={[
        {
          width,
          height,
          backgroundColor: '#F2EAD7',
          borderRadius: 4,
          borderLeftWidth: 2,
          borderLeftColor: Colors.light.accent,
          overflow: 'hidden',
        },
        style,
      ]}
    />
  );
};

const ProfileSkeleton = () => {
  return (
    <View style={styles.profileSection}>
      <SkeletonPlaceholder width={110} height={120} style={{ borderRadius: 10 }} />
      <View style={{ flex: 1, alignItems: 'flex-start', gap: 4 }}>
        <SkeletonPlaceholder width="80%" height={18} />
        <SkeletonPlaceholder width="60%" height={16} style={{ marginTop: 8 }} />
        <SkeletonPlaceholder width="50%" height={16} style={{ marginTop: 8 }} />
        <SkeletonPlaceholder width="70%" height={16} style={{ marginTop: 8 }} />
      </View>
    </View>
  );
};

const InputSkeleton = () => {
  return (
    <View style={styles.inputContainer}>
      <SkeletonPlaceholder width={60} height={20} />
      <SkeletonPlaceholder width="100%" height={55} style={{ marginTop: 5, borderRadius: 12 }} />
    </View>
  );
};

const EditProfile = () => {
  // Add a key to help with proper rendering
  const token = useSelector((state: any) => state.user.token);
  const familyId = useSelector((state: any) => state.user.family_id);
  const username = useSelector((state: any) => state.user.name);
  const userId = useSelector((state: any) => state.user.id);
  const photo = useSelector((state: any) => state.user.photo);
  const [refreshKey] = useState(0);
  
  // Form data state
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [prefix, setPrefix] = useState('')
  
  // Profile data and loading states
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch profile data
  const fetchProfileData = async () => {
    setLoading(true);
    setError(null);
    console.log('Fetching profile data for userId:', userId);
    console.log('Using token:', token);
    
    try {
      const response = await client.post(
        `/mumeneen/update_details/${userId}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      
      if (response.data && response.data.status === 'success') {
        const data = response.data.data;
        setProfileData(data);
        
        // Update form fields with fetched data
        setName(data.name || '');
        setPrefix(data.title || '');
        setMobile(data.mobile || '');
        setEmail(data.email || '');
        setAddress(data.building || '');
      } else {
        setError(response.data?.message || 'Failed to fetch profile data');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching profile data');
      console.error('Profile fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Update profile data
  const updateProfile = async () => {
    setUpdating(true);
    setError(null);
    
    try {
      const response = await client.post(
        `/mumeneen/update_details/${userId}`,
        {
          name,
          // title: prefix,
          mobile,
          building: address,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      
      if (response.data && response.data.status === 'success') {
        Alert.alert(
          'Success',
          'Profile updated successfully!',
          [{ text: 'OK' }]
        );
        // Refresh data
        fetchProfileData();
      } else {
        setError(response.data?.message || 'Failed to update profile');
        Alert.alert(
          'Error',
          response.data?.message || 'Failed to update profile',
          [{ text: 'OK' }]
        );
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while updating profile');
      Alert.alert(
        'Error',
        err.message || 'An error occurred while updating profile',
        [{ text: 'OK' }]
      );
      console.error('Profile update error:', err);
    } finally {
      setUpdating(false);
    }
  };
  
  // Load profile data on component mount
  useEffect(() => {
    fetchProfileData();
  }, []);
  
  const renderContent = useCallback(() => {
    if (loading && !profileData) {
      return (
        <View style={styles.contentWrapper}>
          <ProfileSkeleton />
          <View style={{flex:1, gap:15, marginTop: 15}}>
            <InputSkeleton />
            <InputSkeleton />
            <InputSkeleton />
            <InputSkeleton />
            <InputSkeleton />
            <SkeletonPlaceholder width="100%" height={50} style={{ borderRadius: 25 }} />
          </View>
        </View>
      );
    }
    
    if (error && !profileData) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <RoundedButton
            title="Retry"
            onPress={fetchProfileData}
          />
        </View>
      );
    }
    
    return (
      <View style={styles.contentWrapper}>
        {/* Profile section */}
        <View style={styles.profileSection}>
          <Image
            source={!photo ? require("@/assets/images/profile.png") : {uri: photo}}
            style={{width:110, height:120, resizeMode:'contain'}}
          />
          <View style={{flex:1, alignItems:'flex-start', gap:4}}>
            <Text style={{fontSize:14, fontWeight:"bold", color:primary}}>
              {profileData?.name || username}
            </Text>
            <Text style={{fontSize:14, color:primary}}>
              ITS Number: {profileData?.its || 'N/A'}
            </Text>
            <Text style={{fontSize:14, color:primary}}>
              Folio No: {profileData?.folio_no || 'N/A'}
            </Text>
            <Text style={{fontSize:14, color:primary}}>
              {profileData?.sector_id && profileData?.sub_sector_id 
                ? `${getSectorName(profileData.sector_id)} - ${getSubsectorName(profileData.sub_sector_id)}` 
                : 'N/A'}
            </Text>
          </View>
        </View>
        
        {/* Form inputs */}
        <View style={{flex:1, gap:15}}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Prefix</Text>
            <TextInput
              value={prefix}
              onChangeText={(text) => setPrefix(text)}
              style={styles.input}
              placeholder="Prefix"
              placeholderTextColor={primary}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={styles.input}
              placeholder="Name"
              placeholderTextColor={primary}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mobile</Text>
            <TextInput
              value={mobile}
              onChangeText={(text) => setMobile(text)}
              style={styles.input}
              placeholder="+91*******786"
              placeholderTextColor={primary}
              keyboardType="phone-pad"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              editable={false}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
              placeholder="fmb52@gmail.com"
              placeholderTextColor={primary}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              value={address}
              numberOfLines={3}
              onChangeText={(text) => setAddress(text)}
              style={[styles.input, { height: 100 }]}
              placeholder="Your address"
              placeholderTextColor={primary}
              multiline
            />
          </View>
          
          <RoundedButton
            title={updating ? "Updating..." : "Save Changes"}
            onPress={updateProfile}
            disabled={updating}
          />
          
          {error && (
            <Text style={styles.formErrorText}>
              {error}
            </Text>
          )}
        </View>
      </View>
    );
  }, [prefix, name, mobile, email, address, profileData, loading, error, updating]);

  // Helper functions for sector/subsector names
  const getSectorName = (sectorId: number): string => {
    const sectors: Record<number, string> = {
      1: 'AAMIL',
      2: 'AASIFIYAH',
      3: 'AMATULLAH',
      4: 'BADRI',
      5: 'BURHANI',
      // Add more sectors as needed
    };
    return sectors[sectorId] || `Sector ${sectorId}`;
  };

  const getSubsectorName = (subSectorId: number): string => {
    const subsectors: Record<number, string> = {
      1: 'A',
      2: 'B',
      3: 'C',
      4: 'D',
      5: 'E',
      // Add more subsectors as needed
    };
    return subsectors[subSectorId] || `${subSectorId}`;
  };

  return (
    <ThemedBackground>
      <View style={styles.safeContainer}>
        <ScrollView
          key={`profile-scroll-${refreshKey}`}
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={false}
        >
          {renderContent()}
        </ScrollView>
      </View>
    </ThemedBackground>
  );
};

// Rename to follow React component naming convention (PascalCase)
export default EditProfile;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    width: '100%',
  },
  container: { 
    flex: 1, 
    alignSelf: "stretch",
  },
  contentContainer: {
    flexGrow: 1, 
    padding: 16, 
    gap: 16
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.light.accent,
  },
  profileSection: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: Colors.light.accent,
  },
  inputContainer: {
    gap: 5,
    alignItems: 'flex-start'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: primary
  },
  input: {
    width: '100%',
    height: 55,
    padding: 15,
    borderWidth: 1,
    borderColor: primary,
    borderRadius: 12,
    color: 'black',
    backgroundColor: 'white'
  },
  // Error state styles
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: Colors.light.alert,
    textAlign: 'center',
    marginBottom: 20,
  },
  formErrorText: {
    fontSize: 14,
    color: Colors.light.alert,
    textAlign: 'center',
    marginTop: 10,
  },
  // Loading indicator styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
