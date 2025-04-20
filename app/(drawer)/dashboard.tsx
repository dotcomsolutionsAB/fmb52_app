import { Image, ScrollView, StyleSheet, Text, View,Dimensions } from "react-native";
import React, { useRef,useState } from "react";
import ThemedBackground from "@/components/ThemedBackground";
import UserDashboardCard from "@/components/cards/UserDashboardCard";
import MenuCard from "@/components/cards/MenuCard";
import Carousel, {Pagination} from 'react-native-reanimated-carousel';
import MasoolCard from "@/components/cards/MasoolCard";
import ThaaliCard from "@/components/cards/ThaaliCard";
const { width } = Dimensions.get('window');
const BANNER_WIDTH = width ;
const BANNER_HEIGHT=120
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
});
