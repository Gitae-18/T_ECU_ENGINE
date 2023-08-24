import React, {memo,useState, useRef, useEffect, useCallback, useLayoutEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Pressable,
  TouchableOpacity,
  Animated,
  SafeAreaView,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
  FlatList,
  linearGradient
} from 'react-native';

const ImageButton = () => {
    const [istime, setIsTime] = useState(false);
    const [isDay, setIsDay] = useState(false);
    const [isMonth, setIsMonth] = useState(false);
    const [isYear, setIsYear] = useState(false);
    return(
        <View style={{flexDirection:'row',left:585}}>
        <TouchableOpacity style={{bottom:40,borderWidth:1,borderColor:'transparent',width:120}} onPressIn={()=>setIsTime(true)}onPressOut={()=>setIsTime(false)}activeOpacity={1.0}>
        <ImageBackground source={istime?require('../../assets/images/engine/Rectangle_115.png'):require('../../assets/images/engine/Rectangle_114.png')} style={{width:100,height:60,position:'absolute',justifyContent:'center',alignItems:'center'}} resizeMode='stretch'>
            <Text style={{fontSize:14,color:'white',fontWeight:'600',}}>Time</Text>
        </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={{bottom:40,borderWidth:1,borderColor:'transparent',width:120,right:40,}} onPressIn={()=>setIsDay(true)}onPressOut={()=>setIsDay(false)}activeOpacity={1.0}>
        <ImageBackground source={isDay?require('../../assets/images/engine/Rectangle_115.png'):require('../../assets/images/engine/Rectangle_114.png')} style={{width:100,height:60,position:'absolute',justifyContent:'center',alignItems:'center'}} resizeMode='stretch'>
            <Text style={{fontSize:14,color:'white',fontWeight:'600',}}>Day</Text>
        </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={{bottom:40,borderWidth:1,borderColor:'transparent',width:120,right:80,}} onPressIn={()=>setIsMonth(true)}onPressOut={()=>setIsMonth(false)}activeOpacity={1.0}>
        <ImageBackground source={isMonth?require('../../assets/images/engine/Rectangle_115.png'):require('../../assets/images/engine/Rectangle_114.png')} style={{width:100,height:60,position:'absolute',justifyContent:'center',alignItems:'center'}} resizeMode='stretch'>
            <Text style={{fontSize:14,color:'white',fontWeight:'600',}}>Month</Text>
        </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={{bottom:40,borderWidth:1,borderColor:'transparent',width:120,right:120}} onPressIn={()=>setIsYear(true)}onPressOut={()=>setIsYear(false)}activeOpacity={1.0}>
        <ImageBackground source={isYear?require('../../assets/images/engine/Rectangle_115.png'):require('../../assets/images/engine/Rectangle_114.png')} style={{width:100,height:60,position:'absolute',justifyContent:'center',alignItems:'center'}} resizeMode='stretch'>
            <Text style={{fontSize:14,color:'white',fontWeight:'600',}}>Year</Text>
        </ImageBackground>
        </TouchableOpacity>
        </View>
    )
}
export default React.memo(ImageButton);

