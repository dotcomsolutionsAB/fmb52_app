import React from 'react'
import { View,Text,Image, TouchableOpacity } from 'react-native'
import CustomSwitch from '../buttons/CustomSwitch'
import { Link } from 'expo-router'

export default function ThaaliCard({english_date,arabic_date,rsv_end_time,menu,thaali_size,taking_thaali,onTakingThaaliChange,onThaaliSizeChange,salwat_chitti,day}) {
  return (
   <View style={{width:"100%",borderRadius:15,backgroundColor:'white',borderWidth:1,borderColor:'#E8EAEA'}}>
      <View style={{width:'100%',padding:10,backgroundColor:'#E8EAEA',borderTopRightRadius:15,borderTopLeftRadius:15,flexDirection:'row',alignItems:"center",justifyContent:'space-between'}}>
        <View style={{backgroundColor:'white',borderRadius:10,borderColor:'#CBA652',borderWidth:1,height:90,alignItems:'center',justifyContent:'center',width:90}}>
            <View style={{padding:10,alignItems:'center',justifyContent:'center',height:60,width:'100%'}}>
            <Text style={{fontSize:16,fontWeight:'bold',color:'black'}}>{arabic_date}</Text>
            <Text style={{fontSize:16,fontWeight:'bold',color:'black'}}>{english_date}</Text>
            </View>
        
          <View style={{width:'100%',backgroundColor:'#CBA652',height:30,borderBottomEndRadius:10,borderBottomStartRadius:10}}>
            <Text style={{fontSize:16,fontWeight:'bold',color:'white',textAlign:'center',}}>{day}</Text>
          </View>
        </View>
        <View style={{flex:1,justifyContent:'flex-start',gap:10,padding:15}}>
            <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
               <Text style={{fontSize:15,fontWeight:'600',color:'black'}}>Taking Thaali</Text>
               <CustomSwitch label1='No' label2='Yes' onChange={onTakingThaaliChange} value={taking_thaali} />
            </View>
            <Text style={{fontSize:15,fontWeight:'600',color:'black'}}>RSV Ends Tomorrow at {rsv_end_time}</Text>
        </View>
      </View>
      <View style={{height:80,width:'100%',paddingHorizontal:8}}>
        <Text style={{fontSize:17,fontWeight:'600',color:'#CBA652',padding:10}}>{menu}</Text>
        <View style={{width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
          <View style={{flexDirection:'row',alignItems:'center',gap:3}}>
            <Text style={{fontSize:13,fontWeight:'600',color:'black'}}>Thaali Size</Text>
            <CustomSwitch customStyle={{width:65}} label1='Full' label2='Half' onChange={onThaaliSizeChange} value={thaali_size} />
          </View>
          <TouchableOpacity style={{flexDirection:'row',alignItems:'center',gap:2}}>
            <Text style={{fontSize:13,fontWeight:'600',color:'black'}}>Salwaat Chitti</Text>
            <Image source={require('@/assets/images/attachment.png')} style={{height:20,width:20}} />
          </TouchableOpacity>
          <Link href={'/(drawer)/dashboard'}>
            <Text style={{fontSize:13,fontWeight:'600',color:'#1976D2',textDecorationColor:'#1976D2',textDecorationStyle:'solid',textDecorationLine:'underline'}}>Read more</Text>
          </Link>
        </View>
      </View>
    </View>
    )
}
