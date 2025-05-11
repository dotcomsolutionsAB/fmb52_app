import { Colors } from '@/constants/Colors'
import { router } from 'expo-router'
import React from 'react'
import { Text, TouchableWithoutFeedback } from 'react-native'
import { View } from 'react-native'

export default function QuickAccessCard({route,name,icon}) {
  return (
   <TouchableWithoutFeedback onPress={()=>{router.push(route)}}>
    <View style={{flex:1,backgroundColor:Colors.light.accent,height:100,borderRadius:10,padding:5}}>
      <View style={{flex:1,backgroundColor:"white",borderTopRightRadius:10,borderTopLeftRadius:10,alignItems:'center',justifyContent:'center'}}>
      {icon}
      </View>
      <View style={{width:"100%"}}>
        <Text style={{fontSize:14,fontWeight:"bold",color:"white",textAlign:"center"}}>
          {name}
        </Text>
      </View>
    </View>
   </TouchableWithoutFeedback>
  )
}
