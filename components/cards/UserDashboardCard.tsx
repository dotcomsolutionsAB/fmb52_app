import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import InlineButton from "../buttons/InlineButton";

export default function () {
  return (
    <View style={styles.container}>
      <View style={{ gap: 10 }}>
        <Image source={require("@/assets/images/profile.png")} />
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text style={{color:'#1976D2',fontSize:16,fontWeight:'600'}}>HOF</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.title,{color:'#808080',fontSize:16}]}>Huzefa Ahmed bhai Chaiwala</Text>
        <View style={{ height: 5 }} />
        <Text style={[styles.subtitle,{color:'#CBA652',fontSize:16,fontWeight:'bold'}]}>Sector:  {"Burhani"}</Text>
        <Text style={[styles.subtitle,{color:'#CBA652',fontSize:16,fontWeight:'bold'}]}>Sub Sector : {"H07"}</Text>
        <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
        <Text style={[styles.subtitle,{color:'#808080',fontSize:16,fontWeight:'bold'}]}>Hub:  {"10,000"}</Text>
        <Text style={[styles.subtitle,{color:'#27B124',fontSize:16,fontWeight:'bold'}]}>Paid : {"5,000"}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "white",
    padding: 10,
    gap: 10,
    borderWidth:1,
    borderColor:'grey'
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  subtitle: {
    fontSize: 15,
    color: "black",
  },
});
