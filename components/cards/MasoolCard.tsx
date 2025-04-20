import { router, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { View,Image,Text } from 'react-native'

export default function MasoolCard({masool_name}) {
   
  return (
    <View style={{width:'100%',padding:15,marginTop:10}}>
        <View style={{width:'100%',backgroundColor:'white',borderRadius:15,height:70,alignItems:"center",justifyContent:'space-between',flexDirection:'row',borderColor:'#E8EAEA',borderWidth:1}}>
            <View style={{position:'absolute',paddingHorizontal:10,borderRadius:10,borderColor:'#E8EAEA',borderWidth:1,backgroundColor:'white',left:20,bottom:55,paddingVertical:4}}>
              <Text style={{fontSize:16,fontWeight:'bold',color:'#252525'}}>Masool Name:</Text>
            </View>
          <Image style={{width:35,height:35,marginLeft:10}} source={require('@/assets/images/flat-hat.png')} />
          <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:16,fontWeight:'bold',color:'#252525'}}>{masool_name}</Text>
          </View>
        </View>
        </View>
  )
}
