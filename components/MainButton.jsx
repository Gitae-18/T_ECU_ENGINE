import React,{/*  useState , useRef, useEffect , useCallback, useLayoutEffect */ }from 'react';
import { /* StyleSheet, Text,  */ View,Image, /* ImageBackground, Pressable, */ TouchableOpacity, /* Animated, SafeAreaView */} from 'react-native';

const MainButton = () => {
    return(
        <>
        <View style={{borderWidth:1,borderColor:'transparent',position:'absolute',left:350,top:285,width:260,height:70,flexDirection:'row'}}>
        <TouchableOpacity style={{marginTop:20,}}>
          <Image source={require('../assets/images/engine/icon_backlight_70_true.png')} style={{width:45,height:45,}} resizeMode="stretch"/>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:20,}}>
          <Image source={require('../assets/images/engine/icon_seatbelt_70_true.png')} style={{width:45,height:45,marginLeft:30,}} resizeMode="stretch"/>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:20,}}>
          <Image source={require('../assets/images/engine/icon_coolant_temp_70_true.png')} style={{width:45,height:45,marginLeft:30,}} resizeMode="stretch"/>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:20,}}>
          <Image source={require('../assets/images/engine/icon_oil_emergency_70_true.png')} style={{width:45,height:45,marginLeft:30,}} resizeMode="stretch"/>
        </TouchableOpacity>
      </View>
      <View style={{borderWidth:1,borderColor:'transparent',position:'absolute',left:300,top:340,width:360,height:70,flexDirection:'row'}}>
        <TouchableOpacity style={{marginTop:20,}}>
          <Image source={require('../assets/images/engine/icon_battery_70_true.png')} style={{width:45,height:45,}} resizeMode="stretch"/>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:20,}}>
          <Image source={require('../assets/images/engine/icon_emergency_70_true.png')} style={{width:45,height:45,marginLeft:30,}} resizeMode="stretch"/>      
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:20,}}>
          <Image source={require('../assets/images/engine/icon_parking_70_true.png')} style={{width:45,height:45,marginLeft:30,}} resizeMode="stretch"/>      
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:20,}}>
          <Image source={require('../assets/images/engine/icon_oil_pressure_70_true.png')} style={{width:45,height:45,marginLeft:30,}} resizeMode="stretch"/>      
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:20,}}>
          <Image source={require('../assets/images/engine/icon_oil_temp_70_true.png')} style={{width:45,height:45,marginLeft:30,}} resizeMode="stretch"/>      
        </TouchableOpacity>
      </View>
      </>
    )
}

export default MainButton;