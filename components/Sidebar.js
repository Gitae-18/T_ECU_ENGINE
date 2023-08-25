import { NavigationContainer } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React,{ useState , useRef, useLayoutEffect }from 'react';

import { StyleSheet, Text,  View,Image, ImageBackground, /* Pressable, */ TouchableOpacity, Animated} from 'react-native';

  
  const Sidebar = ({visible,setSidebar,navigation}) => {

    const [isback, setIsBack] = useState(true);
    const [isdashboard, setIsDashBoard] = useState(true);
    const [issystem, setIsSystem] = useState(true);
    const [issetting, setIsSetting] = useState(true);
    const [isdata, setIsData] = useState(true);
    
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const onClickBack = () => {
      setIsBack(false);
    }
    const onBackOut = () => {
      setIsBack(true);
      setSidebar(false);
    }
    const onClickDashBoard = () => {
      setIsDashBoard(false);  
      navigation.navigate('DashBoard');
      setSidebar(false);    
    }
    const onDashBoardOut = () => {
      setIsDashBoard(true);
    }
    const onClickSystem = () => {
      setIsSystem(false);
      navigation.navigate('System')
      setSidebar(false);;
    }
    const onSystemOut = () => {
      setIsSystem(true);
    }
    const onClickSetting = () => {
      setIsSetting(false);
      navigation.navigate('Setting')
      setSidebar(false);
    }
    const onSettingOut = () => {
      setIsSetting(true);
    }
    const onClickData = () => {
      setIsData(false);
      navigation.navigate('Data');
      setSidebar(false);
    }
    const onDataOut = () => {
      setIsData(true);
    }
    useLayoutEffect(() => {
        Animated.timing(fadeAnim, {
          toValue: visible? 1 : 0,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      }, [fadeAnim,visible,navigation]);
    return (
        <View style={{ transform: [{ translateX: 550 },],width:'100%',height:'100%',position:'absolute',zIndex:1000, }}>
          {visible&&
            <Animated.View style={{opacity: fadeAnim}}>
            <ImageBackground style={Imgstyle.imgWrapper} resizeMode='cover' source={require('../assets/images/engine/bg_slide_menu.png')}>
  
            <TouchableOpacity onPressIn={onClickBack} onPressOut={onBackOut} activeOpacity={0.8}>
              <ImageBackground source={require('../assets/images/engine/buttonback.png')} style={Imgstyle.slidemenubtn}>
                <View>
                  <Image source={isback?require('../assets/images/engine/icon_back_50_true.png'):require('../assets/images/engine/icon_back_50_false.png')} resizeMode='center' style={Imgstyle.backbtn}/>
                 
                </View>              
                  <Text style={isback?TextStyle.backtext:TextStyle.backtextorange}>Back</Text>              
              </ImageBackground>
              </TouchableOpacity>
   
              <Image source={require('../assets/images/engine/img_slidemenu_contour_bar.9.png')} style={alignStyle.sidebar_underline}/>
  
              <TouchableOpacity style={alignStyle.sidebar_first_box}  onPressIn={onClickDashBoard} onPressOut={onDashBoardOut} activeOpacity={0.8}>
                  <ImageBackground source={require('../assets/images/engine/buttonback.png')} style={Imgstyle.DashBoardBtn}>
                      <View>
                        <Image source={isdashboard?require('../assets/images/engine/dashboard_true.png'):require('../assets/images/engine/dashboard_false.png')} resizeMode='center' style={Imgstyle.dashbtn}/>
                      </View>              
                        <Text style={isdashboard?TextStyle.backtext:TextStyle.backtextorange}>DASHBOARD</Text>              
                  </ImageBackground>
               </TouchableOpacity>
  
              <TouchableOpacity  onPressIn={onClickSystem} onPressOut={onSystemOut} activeOpacity={0.8}>
                <ImageBackground source={require('../assets/images/engine/buttonback.png')} style={Imgstyle.SystemBtn}>
                  <View>
                    <Image source={issystem?require('../assets/images/engine/icon_system_50_true.png'):require('../assets/images/engine/icon_system_50_false.png')} resizeMode='center' style={Imgstyle.backbtn}/>
                  </View>              
                  <Text style={issystem?TextStyle.backtext:TextStyle.backtextorange}>SYSTEM</Text>              
                </ImageBackground>
              </TouchableOpacity>
  
              <TouchableOpacity  onPressIn={onClickSetting} onPressOut={onSettingOut} activeOpacity={0.8}>
                <ImageBackground source={require('../assets/images/engine/buttonback.png')} style={Imgstyle.SettingBtn}>
                  <View>
                    <Image source={issetting?require('../assets/images/engine/icon_setting_50_true.png'):require('../assets/images/engine/icon_setting_50_false.png')} resizeMode='center' style={Imgstyle.backbtn}/>
                  </View>              
                  <Text style={issetting?TextStyle.backtext:TextStyle.backtextorange}>SETTING</Text>              
                </ImageBackground>
              </TouchableOpacity>
  
              <TouchableOpacity  onPressIn={onClickData} onPressOut={onDataOut} activeOpacity={0.8}>
                <ImageBackground source={require('../assets/images/engine/buttonback.png')} style={Imgstyle.DataBtn}>
                  <View>
                   <Image source={isdata?require('../assets/images/engine/icon_data_50_true.png'):require('../assets/images/engine/icon_data_50_false.png')} resizeMode='center' style={Imgstyle.backbtn}/>
                  </View>
                    <Text style={isdata?TextStyle.backtext:TextStyle.backtextorange}>DATA</Text>              
                </ImageBackground>
              </TouchableOpacity>
  
            </ImageBackground>
          </Animated.View> 
        }
        </View>
    );
  };
  const Imgstyle = StyleSheet.create({
    imgWrapper: {
      width: '100%',
      height: '100%',
      zIndex:1000,
    },
    slidemenubtn: {
      width: 250,
      height: 70,
      marginTop: 30,
      marginLeft: 150,
      borderRadius:50,
    },
    DashBoardBtn:{
      width: 250,
      height: 70,
      marginTop: 30,
      marginLeft: 150,
    },
    SystemBtn:{
      width: 250,
      height: 70,
      marginTop: 40,
      marginLeft: 150,
    },
    SettingBtn:{
      width: 250,
      height: 70,
      marginTop: 30,
      marginLeft: 150,
    },
    DataBtn:{
      width: 250,
      height: 70,
      marginTop: 30,
      marginLeft: 150,
    },
    backbtn: {
      marginLeft: 30,
      marginTop: 10,
    },
    dashbtn: {
      marginLeft: 30,
      marginTop: 10,
      borderRadius:30,
    },
    default:{
      alignItems:'center',
      justifyContent:'center',
      height:60,
      width:110,
    },
    menu:{
    },
  });
  
  const alignStyle = StyleSheet.create({
    sidebar_first_box:{
      position:'relative',
      top:15,
    },
    sidebar_underline:{
      width:'48%',
      position:'relative',
      top:20,
      left:100,
    }
  });
  const TextStyle = StyleSheet.create({
    backtext: {
      color: 'white',
      marginLeft: 120,
      position: 'relative',
      bottom: 35,
      fontWeight:'bold',
    },
    backtextorange: {
      color: 'orange',
      marginLeft: 120,
      position: 'relative',
      bottom: 35,
      fontWeight:'bold',
    }
  });
  Sidebar.propTypes = {   
   navigation: PropTypes.object.isRequired,
  }
  export default React.memo(Sidebar);