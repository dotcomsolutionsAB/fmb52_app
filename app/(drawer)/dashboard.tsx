import { Image, ScrollView, StyleSheet, Text, View,Dimensions, Touchable, TouchableOpacity, FlatList } from "react-native";
import React, { useRef,useState } from "react";
import ThemedBackground from "@/components/ThemedBackground";
import UserDashboardCard from "@/components/cards/UserDashboardCard";
import MenuCard from "@/components/cards/MenuCard";
import Carousel, {Pagination} from 'react-native-reanimated-carousel';
import MasoolCard from "@/components/cards/MasoolCard";
import ThaaliCard from "@/components/cards/ThaaliCard";
import ReceiptCard from "@/components/cards/ReceiptCard";
import QuickAccessCard from "@/components/cards/QuickAccessCard"
import { Colors } from "@/constants/Colors";
const { width } = Dimensions.get('window');
const BANNER_WIDTH = width ;
const BANNER_HEIGHT=120
const CARD_WIDTH=(width-50)/3
const Dashboard = () => {
  const ref=useRef(null)
   const [taking_thaali, settaking_thaali] = useState('Yes')
   const [thaali_size, setthaali_size] = useState('Full')
  const onTakingThaaliChange = () => {
    if(taking_thaali==='Yes'){
      settaking_thaali('No')
    }else{
      settaking_thaali('Yes')
    }
  };
  const onThaaliSizeChange = () => {
    if(thaali_size==='Full'){
      setthaali_size('Half')
    }else{
      setthaali_size('Full')
    }
  }
  const routes=[
    {
      key:1,
      title:"Thaali Menu",
      route:'thaali-menu'
    },
    {
      key:2,
      title:"Receipts",
      route:'receipts'
    },
    {
      key:3,
      title:"Zabihat",
      route:"zabihat"
    },
    {
      key:4,
      title:"Feedback",
      route:"feedback"
    },
    {
      key:5,
      title:"Edit Profile",
      route:"edit_profile"
    },
    {
      key:6,
      title:"Notification",
      route:"notifications"
    },
    {
      key:7,
      title:"Niyaz Date",
      route:"niyaz"
    },
  ]
 
  return (
    <ThemedBackground>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.carouselContainer}>
            <Carousel
              ref={ref}
              width={BANNER_WIDTH}
              height={BANNER_HEIGHT}
              data={[1,2,3]}
              mode="parallax"
              modeConfig={{
                parallaxScrollingScale: 0.9,
                parallaxScrollingOffset: 50,
                parallaxAdjacentItemScale: 0.8,
              }}
              autoPlay
              autoPlayInterval={5000}
              loop
              
              renderItem={({item}) => {
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
       <Image style={{width:'100%',height:20}} source={require('../../assets/images/golden_strip.png')} />
        <MasoolCard
        masool_name={'Huzaifa Bhai Taher Bhai Master'}
        />
        <View style={{width:'100%',paddingHorizontal:15}}>
        <ThaaliCard thaali_size={thaali_size} onThaaliSizeChange={onThaaliSizeChange} menu={'Chicken Tarkari, Roti, Dal Chawal Palidu'} taking_thaali={taking_thaali} onTakingThaaliChange={onTakingThaaliChange} english_date={'21 April'} arabic_date={'١٤ شوال'} day={'Monday'} rsv_end_time={'8:00 PM'} /> 
        </View>
        <View style={{width:'100%',paddingHorizontal:15,marginTop:15}}>
        <UserDashboardCard/>
        <View style={{paddingVertical:15}}>
          <View style={{width:"100%",padding:10,backgroundColor:Colors.light.accent,borderTopEndRadius:10,borderTopStartRadius:10}}>
            <Text style={{color:'white',fontSize:16,fontWeight:'bold'}}>Recent Receipts</Text>
          </View>
          {Array(4)
          .fill(0)
          .map((_, i) => (
            <ReceiptCard key={i} innerCardStyle={{gap:0}} fontSize={13} customStyle={{borderRadius:0,borderColor:'lightgray'}} buttonStyle={{ borderEndEndRadius: 0,borderTopEndRadius: 0,borderBottomWidth:1,borderColor:'lightgray'}}/>
          ))}
         <TouchableOpacity style={{width:'100%',backgroundColor:"white",borderBottomEndRadius:10,borderBottomStartRadius:10,alignItems:'center',justifyContent:'center',padding:10}}>
          <Text style={{color:'#1976D2',fontSize:16,fontWeight:'bold'}}>View   All</Text>
         </TouchableOpacity>
        </View>
        <Text style={{color:'grey',fontSize:16,fontWeight:'bold',marginBottom:10}}>Quick Access</Text>
        <View style={styles.quickAccessContainer}>
          {routes.map((route, index) => (
            <View key={index} style={styles.quickAccessItem}>
              <QuickAccessCard name={route.title} route={route.route} />
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
  container: { flex: 1, alignSelf: "stretch" },
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
   marginTop:10,
   backgroundColor:'white',
   paddingHorizontal:5,

  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    resizeMode:'stretch',
    // overflow:'hidden'
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
    justifyContent: 'space-between',
    paddingBottom: 15,
  },
  quickAccessItem: {
    width: CARD_WIDTH,
    marginBottom: 10,
  },
});
