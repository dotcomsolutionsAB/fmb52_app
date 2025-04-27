import { Colors } from '@/constants/Colors'
import { router } from 'expo-router'
import React from 'react'
import { Text, TouchableWithoutFeedback } from 'react-native'
import { View } from 'react-native'

export default function QuickAccessCard({route,name}) {
  return (
   <TouchableWithoutFeedback onPress={()=>{router.push(route)}}>
    <View style={{flex:1,backgroundColor:Colors.light.accent,height:100,borderRadius:10,padding:5}}>
      <View style={{flex:1,backgroundColor:"white",borderTopRightRadius:10,borderTopLeftRadius:10}}>
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
