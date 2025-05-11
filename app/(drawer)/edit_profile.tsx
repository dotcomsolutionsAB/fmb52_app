import { StyleSheet, Text, View, ScrollView, Image, TextInput } from "react-native";
import React, { useCallback, useState } from "react";
import ThemedBackground from "@/components/ThemedBackground";
import { Colors } from "@/constants/Colors";
import RoundedButton from "@/components/buttons/RoundedButton";
import { useSelector } from "react-redux";
 const primary=Colors.light.accent
const EditProfile = () => {
  // Add a key to help with proper rendering
   const token = useSelector((state: any) => state.user.token);
  const familyId = useSelector((state: any) => state.user.family_id);
  const username = useSelector((state: any) => state.user.name);
  const photo=useSelector((state: any) => state.user.photo);
  const [refreshKey] = useState(0);
  const [name, setname] = useState('')
  const [mobile, setmobile] = useState('')
  const [email, setemail] = useState('')
  const [address, setaddress] = useState('')
  const [prefix, setprefix] = useState('')
  
  const renderContent = useCallback(() => {
    return (
      <View style={styles.contentWrapper}>
      
        {/* Your profile editing components will go here */}
        <View style={styles.profileSection}>
    
          {/* Add your input fields here */}
          <Image
          source={!photo?require("@/assets/images/profile.png"):{uri:photo}}

          style={{width:110,height:120,resizeMode:'contain'}}
          />
          <View style={{flex:1,alignItems:'flex-start',gap:4}}>
           <Text style={{fontSize:14,fontWeight:"bold",color:primary}}>{username}</Text>
          <Text style={{fontSize:14,color:primary}}>ITS Number: {40415152}</Text>
          <Text style={{fontSize:14,color:primary}}>Family Members: {7}</Text>
          <Text style={{fontSize:14,color:primary}}>Burhani - A05</Text>
          </View>
        </View>
        <View style={{flex:1,gap:15}}>
         <View style={styles.inputContainer}>
           <Text style={styles.label}>Prefix</Text>
           <TextInput
           value={prefix}
           onChangeText={(text)=>setprefix(text)}
            style={styles.input}
            placeholder="Prefix"
            placeholderTextColor={primary}
            // Add other input props as needed
           />
         </View>
         <View style={styles.inputContainer}>
           <Text style={styles.label}>Name</Text>
           <TextInput
           value={name}
           onChangeText={(text)=>setname(text)}
            style={styles.input}
            placeholder="Name"
            placeholderTextColor={primary}
            // Add other input props as needed
           />
         </View>
         <View style={styles.inputContainer}>
           <Text style={styles.label}>Mobile</Text>
           <TextInput
           value={mobile}
           onChangeText={(text)=>setmobile(text)}
            style={styles.input}
            placeholder="+91*******786"
            placeholderTextColor={primary}
            // Add other input props as needed
           />
         </View>
         <View style={styles.inputContainer}>
           <Text style={styles.label}>Email</Text>
           <TextInput
           value={email}
           onChangeText={(text)=>setemail(text)}
            style={styles.input}
            placeholder="fmb52@gmail.com"
            placeholderTextColor={primary}
            // Add other input props as needed
           />
         </View>
         <View style={styles.inputContainer}>
           <Text style={styles.label}>Address</Text>
           <TextInput
           value={address}
           onChangeText={(text)=>setaddress(text)}
            style={styles.input}
            placeholder="Topsia Road, Block 12, Burhani"
            placeholderTextColor={primary}
            // Add other input props as needed
           />
         </View>
         <RoundedButton
         title="Save Changes"
         onPress={()=>{}}
         />
        </View>
      </View>
    );
  }, [prefix,name,mobile,email,address]);

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
    // padding:15
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.light.accent,
  },
  profileSection: {
    marginBottom: 20,
    flexDirection:"row",
    alignItems:"center",
    gap:10
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: Colors.light.accent,
  },
  inputContainer:{
    gap:5,
    alignItems:'flex-start'
  },
  label:{
    fontSize:16,
    fontWeight:'bold',
    color:primary
  },
  input:{
    width:'100%',
    height:55,
    padding:15,
    borderWidth:1,
    borderColor:primary,
    borderRadius:12,
    color:'black',
    backgroundColor:'white'
  }
});
