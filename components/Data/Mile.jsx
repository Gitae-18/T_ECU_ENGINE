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
import {Defs,LinearGradient,Stop,Svg} from 'react-native-svg';
import {VictoryLine, VictoryChart, VictoryTheme, VictoryBar, VictoryAxis, VictoryLabel, VictoryContainer, VictoryTooltip, /* Defs, LinearGradient, Stop */} from 'victory-native';
import DatePicker from 'react-native-date-picker';
import MileChart from './Charts/MileChart';
import VehicleInfo from './VehicleInfo';
import ImageButton from './ImageButton';
const Mile = () =>{
    const [pickerValue, setPickerValue] = useState("등록된 T-ECU ID");
    const [open, setOpen] = useState(false);
    const [open2,setOpen2] = useState(false);
    const [date, setDate] = useState(new Date());
    const [today,setToday] = useState(new Date());
    const [year,setYear] = useState('00/00/00');
    const [year2,setYear2] = useState('00/00/00');
    const [value, setValue] = useState('등록된 T-ECU ID');
    const [items, setItems] = useState([
        {label: '등록된 T-ECU ID', value: '0'},
        {label: 'aaa', value: 'a'},
        {label: 'bbb', value: 'b'}
        ]);
    const [data, setData] = useState(generateRandomData());
        
    function generateRandomData() {
          return Array.from({ length: 30 }, (_, index) => ({
            x: String(index + 1).padStart(2, '0'),
            y: Math.floor(Math.random() * 101),
          }));
        }
    useLayoutEffect(()=>{
      setData(generateRandomData())
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
    },[date,today])

return(
    <View style={{flex:1,}}>      
    <ImageBackground source={require('../../assets/images/engine/Rectangle.png')} style={{width:520,height:80, marginLeft:70,top:50}} imageStyle={{borderRadius:10}}>
        <View style={{flex:1,flexDirection:'row'}}>
        <View style={{flex:1,left:5,}}><Text style={{left:30,top:10,fontSize:45,color:'#ffb800',position: 'absolute',fontWeight:'bold',}}>125</Text><Text style={{fontSize:25,position:'absolute',color:'white',left:110,top:30,fontWeight:'bold'}}>km</Text>
        <Image source={require('../../assets/images/engine/Vector.png')} style={{height:40,left:170,top:20}}resizeMode='stretch'></Image>
        </View>
        <View style={{flex:1,left:5,}}><Text style={{left:30,top:10,fontSize:45,color:'#ffb800',position: 'absolute',fontWeight:'bold',}}>125</Text><Text style={{fontSize:25,position:'absolute',color:'white',left:110,top:30,fontWeight:'bold'}}>km</Text>
        <Image source={require('../../assets/images/engine/Vector.png')} style={{height:40,left:170,top:20}}resizeMode='stretch'></Image>
        </View>
        <View style={{flex:1,left:5,}}><Text style={{left:30,top:10,fontSize:45,color:'#ffb800',position: 'absolute',fontWeight:'bold',}}>125</Text><Text style={{fontSize:25,position:'absolute',color:'white',left:110,top:30,fontWeight:'bold'}}>km</Text>
        </View>
        </View>
    </ImageBackground>
        
        <View style={{flexDirection:'row'}}>
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
        <ImageButton />
        <ImageBackground source={require('../../assets/images/engine/Rectangle_106.png')} style={{width:800,height:300,left:70,marginTop:30,position:'relative'}} imageStyle={{borderRadius:10}}>
         <View style={{flex:1,flexDirection:'row'}}>
          <Text  style={textStyle.text4}>
            Max Mileage  <Text style={textStyle.km}>82</Text><Text style={{fontSize:14}}>kw</Text>
          </Text>  
          <Image source={require('../../assets/images/engine/Vector_82.png')} style={{height:20,left:180,top:16,}} resizeMode='stretch'></Image>
          <Text  style={textStyle.text8}>
            Max Mileage  <Text style={textStyle.km}>82</Text><Text style={{fontSize:14}}>kw</Text>
          </Text>  
          <Image source={require('../../assets/images/engine/Vector_82.png')} style={{height:20,left:360,top:16,}} resizeMode='stretch'></Image>
          <Text  style={textStyle.text12}>
            Max Mileage  <Text style={textStyle.km}>82</Text><Text style={{fontSize:14}}>kw</Text>
          </Text>  
          </View>
          <MileChart data={data}/>
        </ImageBackground>   
        <View style={{flex:1,width:500,top:60}}>
                      <Image source={require('../../assets/images/engine/img_divider_line.png')} style={{width:950,bottom:0}}></Image>
        </View>
        <VehicleInfo/>
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
      left:20,
      top:15,
    },
    text8:{
      color: 'white',
      position: 'absolute',
      fontSize: 18,
      fontWeight:'600',
      left:200,
      top:15,
    },
    text12:{
      color: 'white',
      position: 'absolute',
      fontSize: 18,
      fontWeight:'600',
      left:380,
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
        marginLeft:40,
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