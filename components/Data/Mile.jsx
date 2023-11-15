import React, {useState, useEffect, useLayoutEffect, useMemo, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  //Pressable,
  TouchableOpacity,
  LogBox
} from 'react-native';
/* import {Defs,LinearGradient,Stop,Svg} from 'react-native-svg'; */
//import {VictoryLine, VictoryChart, VictoryTheme, VictoryBar, VictoryAxis, VictoryLabel, VictoryContainer, VictoryTooltip, Defs, LinearGradient, Stop} from 'victory-native';
import DatePicker from 'react-native-date-picker';
import MileChart from './Charts/MileChart';
import VehicleInfo from './VehicleInfo';
import ImageButton from './ImageButton';
import { useSelector } from 'react-redux';
import { selectAverageData, selectTotalData, selectLeastData } from '../store/MileSlice';

const Mile = () =>{
    const [open, setOpen] = useState(false);
    const [open2,setOpen2] = useState(false);
    const [date, setDate] = useState(new Date());
    const [today,setToday] = useState(new Date());
    const [year,setYear] = useState('00/00/00');
    const [year2,setYear2] = useState('00/00/00');
    const [selectType, setSelectType] = useState('month');
    const [isLoading, setIsLoading] = useState(false);
  /*   const total = useSelector(selectTotalData);
    const average = useSelector(selectAverageData);
    const least = useSelector(selectLeastData); */
    const total = 0;
    const average = 0;
    const least = 0;
    const [istime, setIsTime] = useState(false);
    const [isDay, setIsDay] = useState(false);
    const [isMonth, setIsMonth] = useState(false);
    const [isYear, setIsYear] = useState(false);
    const getData = useCallback(async() => {
      //year ~ year2까지의 데이터를 받아옴
    },[])
     useEffect(()=>{
      LogBox.ignoreLogs(['Require cycle'])
    },[])
    const lastDate = () =>{
      const year = date.getFullYear();
      const month = date.getMonth()+1<10?'0'+(date.getMonth()+1):date.getMonth()+1;
      const day = date.getDate()<10?'0'+date.getDate():date.getDate();
      setYear(`${year}/${month}/${day}`);
    }
    const currentDate = () =>{
      const year = today.getFullYear();
      const month = today.getMonth()+1<10?'0'+(today.getMonth()+1):today.getMonth()+1;
      const day = today.getDate()<10?'0'+today.getDate():today.getDate();
      setYear2(`${year}/${month}/${day}`);
    }
    useEffect(()=>{
      lastDate();
      currentDate();
    },[date,today,selectType])
return(
    <View style={{flex:1,top:30,}}>      
    <ImageBackground source={require('../../assets/images/engine/Rectangle.png')} style={{width:700,height:80, marginLeft:70,top:60}} imageStyle={{borderRadius:10}}>
        <View style={{flex:1,flexDirection:'row'}}>
        <View style={{flex:1,left:5,}}><Text style={{left:30,top:5,fontSize:45,color:'#ffb800',position: 'absolute',fontWeight:'bold',}}>{total}</Text><Text style={{fontSize:25,position:'absolute',color:'white',left:125,top:28,fontWeight:'bold'}}>km</Text>
        <Image source={require('../../assets/images/engine/Vector.png')} style={{height:40,left:220,top:20}}resizeMode='stretch'></Image>
        </View>
        <View style={{flex:1,left:5,}}><Text style={{left:45,top:5,fontSize:45,color:'#ffb800',position: 'absolute',fontWeight:'bold',}}>{Math.round(average)}</Text><Text style={{fontSize:25,position:'absolute',color:'white',left:125,top:28,fontWeight:'bold'}}>km</Text>
        <Image source={require('../../assets/images/engine/Vector.png')} style={{height:40,left:220,top:20}}resizeMode='stretch'></Image>
        </View>
        <View style={{flex:1,left:5,}}><Text style={{left:45,top:5,fontSize:45,color:'#ffb800',position: 'absolute',fontWeight:'bold',}}>{least}</Text><Text style={{fontSize:25,position:'absolute',color:'white',left:125,top:28,fontWeight:'bold'}}>km</Text>
        </View>
        </View>
    </ImageBackground>
        
        <View style={{flexDirection:'row',left:250,top:10,}}>
        <TouchableOpacity style={{bottom:35,borderWidth:1,borderColor:'transparent',width:150,left:590,height:40,}} onPress={()=> setOpen(true)}>
        <ImageBackground source={require('../../assets/images/engine/Rectangle_108.png')} style={{width:160,height:50,position:'absolute'}} resizeMode='stretch'>
        <Text style={{fontSize:15,color:'white',fontWeight:'bold',left:30,top:15,}}>{year}</Text>
        <Image  source={require('../../assets/images/engine/Polygon.png')} style={{width:10,height:10,left:120,}} resizeMode='contain'/>
          <DatePicker modal 
          mode="date"
          open={open} date={date}
           onConfirm={(date) => {
            setOpen(false)
            setDate(date)
          }}
          onCancel={()=>{setOpen(false)}}
          />
        </ImageBackground>
        </TouchableOpacity>
        <Text style={{fontSize:15,color:'white',left:602,bottom:20,}}>~</Text>
        <TouchableOpacity style={{bottom:15,borderWidth:1,borderColor:'transparent',width:120,left:600}} onPress={()=> setOpen2(true)}>
        <ImageBackground source={require('../../assets/images/engine/Rectangle_108.png')} style={{width:160,height:50,position:'absolute',top:-20}} resizeMode='stretch'>
        <Text style={{fontSize:15,color:'white',fontWeight:'bold',left:30,top:15,}}>{year2}</Text>
        <Image  source={require('../../assets/images/engine/Polygon.png')} style={{width:10,height:10,left:120,}} resizeMode='contain'/>
          <DatePicker modal 
          mode="date"
          open={open2} date={today}
           onConfirm={(date) => {
            setOpen2(false)
            setToday(date)
          }}
          onCancel={()=>{setOpen2(false)}}
          />
        </ImageBackground>
        </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row',left:835,top:10,}}>
        <TouchableOpacity style={{bottom:40,borderWidth:1,borderColor:'transparent',width:120}}  onPressIn={()=>{setIsTime(true);setSelectType('time')}}onPressOut={()=>setIsTime(false)}activeOpacity={1.0}>
        <ImageBackground source={istime?require('../../assets/images/engine/Rectangle_115.png'):require('../../assets/images/engine/Rectangle_114.png')} style={{width:100,height:60,position:'absolute',justifyContent:'center',alignItems:'center'}} resizeMode='stretch'>
            <Text style={{fontSize:14,color:'white',fontWeight:'600',}}>Time</Text>
        </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={{bottom:40,borderWidth:1,borderColor:'transparent',width:120,right:40,}} onPressIn={()=>{setIsDay(true);setSelectType('day')}}onPressOut={()=>setIsDay(false)}activeOpacity={1.0}>
        <ImageBackground source={isDay?require('../../assets/images/engine/Rectangle_115.png'):require('../../assets/images/engine/Rectangle_114.png')} style={{width:100,height:60,position:'absolute',justifyContent:'center',alignItems:'center'}} resizeMode='stretch'>
            <Text style={{fontSize:14,color:'white',fontWeight:'600',}}>Day</Text>
        </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={{bottom:40,borderWidth:1,borderColor:'transparent',width:120,right:80,}} onPressIn={()=>{setIsMonth(true);setSelectType('month')}}onPressOut={()=>setIsMonth(false)}activeOpacity={1.0}>
        <ImageBackground source={isMonth?require('../../assets/images/engine/Rectangle_115.png'):require('../../assets/images/engine/Rectangle_114.png')} style={{width:100,height:60,position:'absolute',justifyContent:'center',alignItems:'center'}} resizeMode='stretch'>
            <Text style={{fontSize:14,color:'white',fontWeight:'600',}}>Month</Text>
        </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={{bottom:40,borderWidth:1,borderColor:'transparent',width:120,right:120}}  onPressIn={()=>{setIsYear(true);setSelectType('year')}}onPressOut={()=>setIsYear(false)}activeOpacity={1.0}>
        <ImageBackground source={isYear?require('../../assets/images/engine/Rectangle_115.png'):require('../../assets/images/engine/Rectangle_114.png')} style={{width:100,height:60,position:'absolute',justifyContent:'center',alignItems:'center'}} resizeMode='stretch'>
            <Text style={{fontSize:14,color:'white',fontWeight:'600',}}>Year</Text>
        </ImageBackground>
        </TouchableOpacity>
        </View>
        <ImageBackground source={require('../../assets/images/engine/Rectangle.png')} style={{width:1100,height:450,left:70,top:30,position:'relative'}} imageStyle={{borderRadius:10}}>
         <View style={{flex:1,flexDirection:'row'}}>
          <Text  style={textStyle.text4}>
            Max Mileage  <Text style={textStyle.km}>{total}</Text><Text style={{fontSize:14}}>kw</Text>
          </Text>  
          <Image source={require('../../assets/images/engine/Vector_82.png')} style={{height:20,left:200,top:18,}} resizeMode='stretch'></Image>
          <Text  style={textStyle.text8}>
            Average Mileage  <Text style={textStyle.km}>{Math.round(average)}</Text><Text style={{fontSize:14}}>kw</Text>
          </Text>  
          <Image source={require('../../assets/images/engine/Vector_82.png')} style={{height:20,left:420,top:18,}} resizeMode='stretch'></Image>
          <Text  style={textStyle.text12}>
            Min Mileage  <Text style={{ color: '#ffb800',
            fontWeight: 'bold',
            position: 'absolute',
            fontSize: 17,
            marginLeft:40,}}>{least}</Text><Text style={{fontSize:14}}>kw</Text>
          </Text>  
          </View>
        <View>
          <MileChart year={year} sndYear={year2} select={selectType}/>
        </View>
        </ImageBackground>   
        <View style={{flex:1,width:'100%',height:'100%',top:80}}>
        <Image source={require('../../assets/images/engine/img_divider_line.png')} style={{width:1300,bottom:0,position:'absolute'}}></Image>
        
        </View>
        <View style={{flex:1}}>
          <VehicleInfo/>
        </View>
      </View>
     
)
}
const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    backgroundColor: 'transparent'
  },
  image: {
    width:70,
    height:50,
  },
  touchable: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'white',
    fontSize: 18,
    top:10,
    textAlign: 'center'
  }
})
const textStyle= StyleSheet.create({
    text1:{
        color: 'white',
        fontWeight: 'bold',
        position: 'absolute',
        fontSize: 20,
        left: 60,
        top: 60,
    },
    text2:{
        color: 'white',
        fontWeight: 'bold',
        position: 'absolute',
        fontSize: 20,
        left: 400,
        top: 60,
    },
    text3:{
      color: 'white',
      fontWeight: 'bold',
      position: 'absolute',
      fontSize: 20,
      left: 60,
      top: 120,
    },
    text4:{
      color: 'white',
      position: 'absolute',
      fontSize: 18,
      fontWeight:'600',
      left:15,
      top:15,
    },
    text8:{
      color: 'white',
      position: 'absolute',
      fontSize: 18,
      fontWeight:'600',
      left:210,
      top:15,
    },
    text12:{
      color: 'white',
      position: 'absolute',
      fontSize: 18,
      fontWeight:'600',
      left:430,
      top:15,
    },
    text5:{
      color: 'white',
      fontWeight: 'bold',
      position: 'absolute',
      fontSize: 20,
      left:30,
      top:80,
    },
    km:{
        color: '#ffb800',
        fontWeight: 'bold',
        position: 'absolute',
        fontSize: 17,
        marginLeft:30,
      },
    infotext:{
      color:'white',
      fontWeight:'bold',
      position: 'absolute',
      fontSize:15,
      top:140,
      left:50,
    }
})
export default Mile;