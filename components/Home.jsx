import React,{ useState , useRef, /* useEffect , useCallback, */ useLayoutEffect }from 'react';
import { StyleSheet, Text,  View,Image, ImageBackground, /* Pressable, */ TouchableOpacity, Animated, SafeAreaView, /* PermissionsAndroid, Platform */} from 'react-native';
import Sidebar from './Sidebar';
import PropTypes from 'prop-types';
import MainButton from './MainButton';
import BlueToothModal from './BlueToothModal';
  const Home = ({navigation}) =>{
    const [isModalVisible,setModalVisible] = useState(false);
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const [timer,setTimer] = useState('00:00:00');
    const [year,setYear] = useState('00/00/00');
    const [day,setDay] = useState('');
    const [imageSource, setImageSource] = useState(true);
    const runtimeRef = useRef(0);
    const modeRef = useRef();
    const [runtime,setRuntime] = useState(0);//타이머 시작
    const week = ['일','월','화','수','목','금','토'];
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const currentDate = () =>{
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth()+1<10?'0'+(date.getMonth()+1):date.getMonth()+1;
      const day = date.getDate()<10?'0'+date.getDate():date.getDate();
      setYear(`${year}/${month}/${day}`);
    }

    const currentTimer = () =>{
      const date = new Date();
      const hours = String(date.getHours()).padStart(2,'0');
      const minutes = String(date.getMinutes()).padStart(2,'0');
      const seconds = String(date.getSeconds()).padStart(2,'0');
      setTimer(`${hours}:${minutes}:${seconds}`);

    }
    const timerIntervalRef = useRef(null);
    const date = new Date();

    const toggleSidebar = () => {
      setSidebarVisible(!isSidebarVisible);
    }
    const startTimer = () =>{
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
  
      // Start a new timer interval
      timerIntervalRef.current = setInterval(currentTimer, 1000);
    }
    

    useLayoutEffect(() => {
      const timerId = setInterval(() => {
        runtimeRef.current += 1;
      }, 1000);
  
      return () => clearInterval(timerId);
    }, [navigation]);
    /* const startRun = () =>{
      const timerId = setInterval(() => {
        setRuntime((prevTime) => prevTime + 1);
      }, 1000);
      //컴포넌트 언마운트 타이머 정리
      return () => clearInterval(timerId);
    } */
    const modeChange = () => {
      setImageSource(!imageSource);
    }
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    }
    const closeModal = () =>{
      setModalVisible(false);
    }
    const formatTime = (timeInSeconds) => {
      const hours = Math.floor(timeInSeconds / 3600);
      const minutes = Math.floor((timeInSeconds % 3600) / 60);
      const seconds = timeInSeconds % 60;
  
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    useLayoutEffect(()=>{
      currentDate();
      startTimer();
      setDay(week[date.getDay()]);
      return () => {
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
        }
      };
    },[navigation])

  useLayoutEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: imageSource?1:0,
      duration: 2000, // Adjust the duration as needed
      useNativeDriver: true,
    }).start();
  }, [fadeAnim,imageSource,navigation]); 
    return(
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: 'black',
        flexDirection: 'row',
      }}>
      <View style={ImgStyle.content}>
    <View>
      <ImageBackground source={require('../assets/images/engine/Homescreen.png')} style={Imgstyle.bg}>
      <View style={styles.top}>
        <ImageBackground source={require('../assets/images/engine/gear/img_gear_mode_bg.png')} style={Imgstyle.top_gear}>
           <View style={styles.imageContainer}>
                  <Image source={require('../assets/images/engine/gear/img_gear_text.png')} style={GearImg.gear_text}/>
            </View>
                  <Image resizeMode="stretch" source={imageSource?require('../assets/images/engine/gear/img_mode_manual.png'):require('../assets/images/engine/gear/img_mode_auto.png')} 
                  style={imageSource?GearImg.mode:GearImg.mode2}/>
          </ImageBackground>
      </View>
      <View style={styles.imagesContainer}>
      <View style={styles.left}>
        <ImageBackground source={require('../assets/images/engine/gauge/img_gauge_bg_left_10.png')} style={Imgstyle.left_gauge}>
          </ImageBackground>
        </View>
        <View style={styles.center}>
        <ImageBackground source={require('../assets/images/engine/img_center_gauge_bg.png')} style={Imgstyle.center_gauge}>
            <View style={styles.imageContainer}>
              <Image resizeMode="center" source={require('../assets/images/engine/gauge_range/img_center_gauge_fuelbattery_'+10+'.png')} style={Imgstyle.center_left}/>
                <View style={styles.imageContainer}>
                 <Image resizeMode='stretch' source={require('../assets/images/engine/common/fuelgauge_36.png')} style={Imgstyle.fuel}/>
                 <Image resizeMode='stretch' source={require('../assets/images/engine/common/center_coolant_temp_36.png')} style={Imgstyle.coolant}/>
                </View>
              <Image resizeMode="center" source={require('../assets/images/engine/gauge_range/img_center_gauge_oil_temp_'+10+'.png')} style={Imgstyle.center_right}/>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.right}>
        <ImageBackground source={require('../assets/images/engine/gauge/img_gauge_bg_left_10.png')} style={Imgstyle.right_gauge}>
            {/* <View style={styles.imageContainer}>
              <Image resizeMode="center" source={require('./assets/images/engine/gauge_range/img_center_gauge_fuelbattery_'+10+'.png')} style={Imgstyle.center_left}/>
              <Image resizeMode="center" source={require('./assets/images/engine/gauge_range/img_center_gauge_oil_temp_'+10+'.png')} style={Imgstyle.center_right}/>
            </View> */}
          </ImageBackground>
        </View>
        <MainButton/>
        <View style={TextStyle.distance}>
        <Text style={TextStyle.text}>주행거리</Text>
        <Text style={TextStyle.way}>12.43km</Text>
        </View>
        <View style={TextStyle.running_time}>
        <Text style={TextStyle.text}>주행시간</Text>
        <Text style={TextStyle.way}>{formatTime(runtimeRef.current)}</Text>
        </View>
        <View style={TextStyle.year}>
        <Text style={TextStyle.text}>현재날짜</Text>
        <Text style={TextStyle.timer}>{year}{`(${day})`}</Text>
        </View>
        <View style={TextStyle.clock}>
        <Text style={TextStyle.text}>현재시간</Text>
        <Text style={TextStyle.timer}>{timer}</Text>
        </View>
        </View>
        <TouchableOpacity style={{ position: 'absolute',left:200,top:2,alignItems: 'center',justifyContent: 'center',}} onPress={toggleModal}>
        {isModalVisible&&<BlueToothModal isVisible={isModalVisible} transparent={true} closeModal={closeModal} setModalVisible={setModalVisible}/>}
        <Image resizeMode='stretch' source={require('../assets/images/engine/bluetooth.png')} style={{ height:48,width:100,}}/>
        </TouchableOpacity>
        <TouchableOpacity style={{ position: 'absolute',right: 130,top:2,alignItems: 'center',justifyContent: 'center',}}>
        <Image resizeMode='stretch' source={require('../assets/images/engine/img_voice_btn.png')} style={{ height:48,width:100,}}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={toggleSidebar}>
        <ImageBackground source={require('../assets/images/engine/defaultbtn.png')} style={styles.default}>
          <Image resizeMode='center' source={require('../assets/images/engine/menu.png')} style={Imgstyle.menu}/>
        </ImageBackground>
        </TouchableOpacity>
        {isSidebarVisible && <Sidebar visible={isSidebarVisible} setSidebar={setSidebarVisible} navigation={navigation}/>}
      </ImageBackground>     
    </View>
    </View>
    </SafeAreaView>
  )
};
const ImgStyle = StyleSheet.create({
  content: {
    flex: 1,
  },
  homeContainer: {
    flex: 1,
  },

});
const GearImg = {
  gear_text:{
    width:420,
    height:150,
    left:-10,
    bottom:30,
  },
  mode:{
    width:120,
    height:35,
    bottom:55,
    left:142,
  },
  mode2:{
    width:120,
    height:35,
    bottom:55,
    left:142,
  },
}
const Imgstyle = {
  bg: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  sidebarContainer: {
    position:'relative',
    flex:1,
    zIndex:2,
  },
  top_gear:{
    position:'relative',
    width:400,
    height:150,
    top:0,
    marginLeft:280,
  },
  left_gauge:{
    width:380,
    height:380,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center_gauge:{
    width:200,
    height:200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  right_gauge:{
    width:380,
    height:380,
    alignItems: 'center',
    justifyContent: 'center',
    right:60,
  },
  left_speed:{
    width:200,
    height:200,
    alignItems:'center',
    bottom:5,
  },
  center_left:{
    width:170,
    height:170,
    left:120,
  },
  center_right:{
    width:170,
    height:170,
    right:120,
  },
  fuel:{
    width:36,
    height:36,
    position:'relative',
    left:0,
  },
  coolant:{
    position:'relative',
    left:5,
    width:36,
    height:36,
  }
}
const styles = {
  menuButton: {
    position: 'absolute',
    top: 10,
    right: 40,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  default:{
    alignItems:'center',
    justifyContent:'center',
    height:60,
    width:110,
    bottom:10,
  },

  left:{
    flex: 1,
    justifyContent: 'flex-start',
  },
  center:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  right:{
    flex: 1,
    justifyContent: 'flex-end',
  },
  top:{
    flex:-1,
  },
  menu:{
    width:40,
    height:40,
  },
  image_36_Container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding:0,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imagesContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    bottom:70,
  }
}
const TextStyle = {
  clock:{
    position:'absolute',
    flex:1,
    bottom:-60,
    right:10,
    zIndex:0
  },
  distance:{
    position:'absolute',
    flex:1,
    bottom:-60,
    left:10,
    zIndex:0
  },
  running_time:{
    position:'absolute',
    flex:1,
    bottom:-60,
    left:140,
    zIndex:0
  },
  year:{
    position:'absolute',
    flex:1,
    bottom:-60,
    right:140,
    zIndex:0
  },
  way:{
    color:'orange',
    fontSize:22,
    fontFamily:'Inter',
  },
  timer:{
    color:'white',
    fontSize:22,
    fontFamily:'Inter',
  },
  yoil:{
    color:'white',
    fontSize:22,
    fontFamily:'Inter', 
    position:'relative',
  },
  text:{
    color:'white',
    fontSize:18,
    fontFamily:'Inter',
    textAlign:'right',
  }
}
Home.propTypes = {
  navigation: PropTypes.object.isRequired
}
  export default React.memo(Home);