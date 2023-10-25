import React,{useState/*   useRef, useEffect , useCallback, useLayoutEffect */ }from 'react';
import { /* StyleSheet, Text,  */ View,Image, /* ImageBackground, Pressable, */ TouchableOpacity, /* Animated, SafeAreaView */} from 'react-native';
import { selectAlarmData } from './store/alarmSlice';
const MainButton = () => {
    const [seatbelt, handleSeatBelt] = useState(true);
    const [emergency, handleEmergency] = useState(true);
    const [oil_emergency, handleOilEmergency ]= useState(true);
    const [oil_pressure, handleOilPressure] = useState(true);
    const [oil_temp, handleOilTemp] = useState(false);
    const [parking, handleParikng] = useState(true);
    const [backlight, handleBackLight] = useState(true);
    const [battery, handleBattery] = useState(true);
    const [coolant_temp, handleCoolantTemp] = useState(false);
    return(
        <>
        <View style={{borderWidth:1,borderColor:'transparent',position:'absolute',left:350,top:285,width:260,height:70,flexDirection:'row'}}>
        <TouchableOpacity style={{marginTop:20,}} onPress = {() => handleBackLight(!backlight)}>
          <Image source={backlight?require('../assets/images/engine/icon_backlight_70_dim.png'):require('../assets/images/engine/icon_backlight_70_false.png')} style={{width:45,height:45,}} resizeMode="stretch"/>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:20,}} onPress ={() => handleSeatBelt(!seatbelt)}>
          <Image source={seatbelt?require('../assets/images/engine/icon_seatbelt_70_dim.png'):require('../assets/images/engine/icon_seatbelt_70_false.png')} style={{width:45,height:45,marginLeft:30,}} resizeMode="stretch"/>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:20,}} onPress={() => handleCoolantTemp(!coolant_temp)}>
          <Image source={coolant_temp?require('../assets/images/engine/icon_coolant_temp_70_dim.png'):require('../assets/images/engine/icon_coolant_temp_70_false.png')} style={{width:45,height:45,marginLeft:30,}} resizeMode="stretch"/>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:20,}} onPress={()=> handleOilEmergency(!oil_emergency)}>
          <Image source={oil_emergency?require('../assets/images/engine/icon_oil_emergency_70_dim.png'):require('../assets/images/engine/icon_oil_emergency_70_false.png')} style={{width:45,height:45,marginLeft:30,}} resizeMode="stretch"/>
        </TouchableOpacity>
      </View>
      <View style={{borderWidth:1,borderColor:'transparent',position:'absolute',left:300,top:340,width:360,height:70,flexDirection:'row'}}>
        <TouchableOpacity style={{marginTop:20,}} onPress={() => handleBattery(!battery)}>
          <Image source={battery?require('../assets/images/engine/icon_battery_70_dim.png'):require('../assets/images/engine/icon_battery_70_false.png')} style={{width:45,height:45,}} resizeMode="stretch"/>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:20,}} onPress={() => handleEmergency(!emergency)}>
          <Image source={emergency?require('../assets/images/engine/icon_emergency_70_dim.png'):require('../assets/images/engine/icon_emergency_70_false.png')} style={{width:45,height:45,marginLeft:30,}} resizeMode="stretch"/>      
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:20,}} onPress={() => handleParikng(!parking)}>
          <Image source={parking?require('../assets/images/engine/icon_parking_70_dim.png'):require('../assets/images/engine/icon_parking_70_false.png')} style={{width:45,height:45,marginLeft:30,}} resizeMode="stretch"/>      
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:20,}} onPress={() => handleOilPressure(!oil_pressure)}>
          <Image source={oil_pressure?require('../assets/images/engine/icon_oil_pressure_70_dim.png'):require('../assets/images/engine/icon_oil_pressure_70_false.png')} style={{width:45,height:45,marginLeft:30,}} resizeMode="stretch"/>      
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:20,}} onPress={() => handleOilTemp(!oil_temp)}>
          <Image source={oil_temp?require('../assets/images/engine/icon_oil_temp_70_dim.png'):require('../assets/images/engine/icon_oil_temp_70_false.png')} style={{width:45,height:45,marginLeft:30,}} resizeMode="stretch"/>      
        </TouchableOpacity>
      </View>
      </>
    )
}

export default MainButton;