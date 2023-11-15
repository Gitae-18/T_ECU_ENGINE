import React,{useState , useEffect , useCallback, useLayoutEffect, useRef }from 'react';
import { /* StyleSheet, Text,  */ View,Image, /* ImageBackground, Pressable, */ TouchableOpacity, /* Animated, SafeAreaView */} from 'react-native';
import { selectAlarmData } from './store/alarmSlice';
import PopupModal from './PopupModal';
const MainButton = ({park, emer, eng, navigation}) => {
    const [modal, setModal] = useState(false);
    const [seatbelt, handleSeatBelt] = useState(true);
    const [emergency, handleEmergency] = useState(true);
    const [oil_emergency, handleOilEmergency ]= useState(true);
    const [oil_pressure, handleOilPressure] = useState(true);
    const [oil_temp, handleOilTemp] = useState(true);
    const [parking, handleParking] = useState(true);
    const [backlight, handleBackLight] = useState(true);
    const [battery, handleBattery] = useState(true);
    const [coolant_temp, handleCoolantTemp] = useState(true);
    const [variables, setVariables] = useState([
      'handleBackLight',
      'handleSeatBelt',
      'handleCoolantTemp',      
      'handleOilEmergency',
      'handleBattery',
      'handleEmergency',
      'handleParking',
      'handleOilPressure',      
      'handleOilTemp',
    ]);
    const ViewPopup = () => {
      setModal(true);       
    }
    const closeModal = () => {
      setModal(false);
    }
      
    /* const updateState = useCallback(async() => {
      switch(park){
        case '0' :
          handleParking(true);
          break;
        case '1' :
          handleParking(false);
          break;
        default:
          break;
      }          
      switch(emer){
        case '0' :
          handleEmergency(true);
          break;
        case '1' :
          handleEmergency(false);
          break;
        default:
          break;
      }
      if  (eng==='1')
      {
        handleEmergency(true);
        switch(emer){
          case '0' :
            handleEmergency(true);
            break;
          case '1' :
            handleEmergency(false);
            break;
          default:
            break;
        }
      }
      else if(eng === '0'){
        handleEmergency(true);
      }
      
  },[park,emer,eng]) */
  useEffect(() => {
     let currentIndex = 0;
    if(navigation)
    {
    const interval = setInterval(() => {
      const currentVariable = variables[currentIndex];
      if (currentVariable) {
        // 현재 변수를 false로 설정
        eval(`${currentVariable}(false)`);
      }
      currentIndex++;
      if (currentIndex >= variables.length) {
        // 모든 변수가 설정된 후 3초 후에 모든 변수를 true로 설정
        setTimeout(() => {
          setVariables(prevVariables => {
            return prevVariables.map(variable => {
              eval(`${variable}(true)`);
              return variable;
            });
          });
        }, 3000);        
        // currentIndex 초기화
        currentIndex = 0;       
      }
    }, 1000);
    if(emergency === false){
      setModal(true);
      setTimeout(() => {
      setModal(false);
      }, 2000); 
    }       
    if(emergency === false && parking === false)
    {
      setModal(true);
      setTimeout(() => {
      setModal(false);
      }, 2000); 
    } 
    return () => {
      clearInterval(interval);
      setModal(false);
      handleParking(true);
      handleEmergency(true);
    };
  }
  }, [variables,parking,emergency]);
/*   useEffect(() => {
    updateState()
  },[updateState]) */
    return(
        <>
       <View style={{borderWidth:1,borderColor:'transparent',position:'absolute',left:490,top:285,width:260,height:70,flexDirection:'row'}}>
        <TouchableOpacity style={{marginTop:20}} onPress = {() => handleBackLight(!backlight)}>
          <Image source={backlight?require('../assets/images/engine/icon_backlight_70_dim.png'):require('../assets/images/engine/icon_backlight_70_false.png')} style={{width:55, height:55,}} resizeMode="stretch"/>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:20,}} onPress ={() => handleSeatBelt(!seatbelt)}>
          <Image source={seatbelt?require('../assets/images/engine/icon_seatbelt_70_dim.png'):require('../assets/images/engine/icon_seatbelt_70_false.png')} style={{width:55, height:55,marginLeft:30,}} resizeMode="stretch"/>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:20,}} onPress={() => handleCoolantTemp(!coolant_temp)}>
          <Image source={coolant_temp?require('../assets/images/engine/icon_coolant_temp_70_dim.png'):require('../assets/images/engine/icon_coolant_temp_70_false.png')} style={{width:55, height:55,marginLeft:30,}} resizeMode="stretch"/>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:20,}} onPress={()=> handleOilEmergency(!oil_emergency)}>
          <Image source={oil_emergency?require('../assets/images/engine/icon_oil_emergency_70_dim.png'):require('../assets/images/engine/icon_oil_emergency_70_false.png')} style={{width:55, height:55,marginLeft:30,}} resizeMode="stretch"/>
        </TouchableOpacity>
      </View>
      <View style={{borderWidth:1,borderColor:'transparent',position:'absolute',left:450,top:365,width:360,height:80,flexDirection:'row'}}>
        <TouchableOpacity style={{marginTop:20,}} onPress={() => handleBattery(!battery)}>
          <Image source={battery?require('../assets/images/engine/icon_battery_70_dim.png'):require('../assets/images/engine/icon_battery_70_false.png')} style={{width:55, height:55,}} resizeMode="stretch"/>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:20,}} onPress={() => handleEmergency(!emergency)}>
          <Image source={emergency?require('../assets/images/engine/icon_emergency_70_dim.png'):require('../assets/images/engine/icon_emergency_70_false.png')} style={{width:55, height:55,marginLeft:30,}} resizeMode="stretch"/>      
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:20,}} onPress={() => handleParking(!parking)}>
          <Image source={parking===true?require('../assets/images/engine/icon_parking_70_dim.png'):require('../assets/images/engine/icon_parking_70_false.png')} style={{width:55, height:55,marginLeft:30,}} resizeMode="stretch"/>      
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:20,}} onPress={() => handleOilPressure(!oil_pressure)}>
          <Image source={oil_pressure?require('../assets/images/engine/icon_oil_pressure_70_dim.png'):require('../assets/images/engine/icon_oil_pressure_70_false.png')} style={{width:55, height:55, marginLeft:30,}} resizeMode="stretch"/>      
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:20,}} onPress={() => handleOilTemp(!oil_temp)}>
          <Image source={oil_temp?require('../assets/images/engine/icon_oil_temp_70_dim.png'):require('../assets/images/engine/icon_oil_temp_70_false.png')} style={{width:55, height:55,marginLeft:30,}} resizeMode="stretch"/>      
        </TouchableOpacity>
      </View>
      <View>
        {modal&&<PopupModal visible={modal} close={closeModal} style={{top:200,}} parking={parking} emergency={emergency}/>}
        <TouchableOpacity onPress={ViewPopup} style={{width:100 ,height:60, borderWidth:1, borderColor:'transparent',flex:1,position:'absolute', right:610, top:280, }}>
          {!modal&&<Image resizeMode='stretch' source={require('../assets/images/engine/img_bottom_popup_btn.png')} style={{position:'relative',width:150,height:45,}}/>}
          </TouchableOpacity>
      </View>
      </>
    )
}

export default MainButton;