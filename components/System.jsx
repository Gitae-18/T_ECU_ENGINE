import React, {useState, /* useRef, useCallback */useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Pressable,
  TouchableOpacity,
 //Animated,
  ScrollView,
  FlatList
} from 'react-native';
import Sidebar from './Sidebar';
import PropTypes from 'prop-types';
import T_ECU from './System/T-ECU';
import { SafeAreaView } from 'react-native-safe-area-context';
import { selectVehicleAmount } from './store/VehicleAmount';
import { useSelector } from 'react-redux';
const System = ({navigation}) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [zIndex1, setZIndex1] = useState(3);
  const [zIndex2, setZIndex2] = useState(1);
  const [zIndex3, setZIndex3] = useState(1);
  const [zIndex4, setZIndex4] = useState(1000);

  const [isText1, setIsText1] = useState(false);
  const [isText2, setIsText2] = useState(false);
  const [isText3, setIsText3] = useState(false);
  const vehicleLength= useSelector(selectVehicleAmount);
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };
    const handlePressText1 = () => {
    setZIndex1(3);
    setZIndex2(2);
    setZIndex3(1);
    setIsText1(true);
  };
  const handlePressOut1 = () => {
    setIsText1(false);
  };
  const handlePressText2 = () => {
    setZIndex1(1);
    setZIndex2(3);
    setZIndex3(2);
    setIsText2(true);
  };
  const handlePressOut2 = () => {
    setIsText2(false);
  };
  const handlePressText3 = () => {
    setZIndex1(2);
    setZIndex2(1);
    setZIndex3(3);
    setIsText3(true);
  };
  const handlePressOut3 = () => {
    setIsText3(false);
  };
  const handlePressInBg1 = () => {
    handlePressText1();
  };
  const handlePressOutBg1 = () => {
    handlePressOut1();
  };
  
  const handlePressInBg2 = () => {
    handlePressText2();
  };
  const handlePressOutBg2 = () => {
    handlePressOut2();
  };
  
  const handlePressInBg3 = () => {
    handlePressText3();
  };
  const handlePressOutBg3 = () => {
    handlePressOut3();
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black', flexDirection: 'row'}}>
    <View style={{ flex: 1, height:'100%', }}>
      <ImageBackground source={require('../assets/images/engine/Homescreen.png')} style={Imgstyle.bg} resizeMode='stretch'>
        <TouchableOpacity style={styles.menuButton} onPress={toggleSidebar}>
        <ImageBackground source={require('../assets/images/engine/Rectangle_90.png')} style={styles.default} resizeMode="contain">
               <Image resizeMode='center' source={require('../assets/images/engine/menu.png')} style={Imgstyle.menu}
                ></Image>
               </ImageBackground>
        </TouchableOpacity>
        {isSidebarVisible && <Sidebar style={{ zIndex: 1000 }} visible={isSidebarVisible} setSidebar={setSidebarVisible} navigation={navigation} />}
         
        <FlatList
          style={{ flex: 1, width: '100%', paddingVertical: 10, marginTop:50,}}
          nestedScrollEnabled={true}
          data={[
            { key: 'tab1', text: 'T-ECU', left: 70, onPressIn: handlePressInBg1, onPressOut: handlePressOutBg1 },
          ]}
          contentContainerStyle={{ paddingBottom: 100 * (vehicleLength/2)}}
          renderItem={({ item }) => (
            <SafeAreaView>
            <View style={{zIndex:99,top:0}}>
            <TouchableOpacity
                 onPressIn={handlePressInBg1}
                 onPressOut={handlePressOutBg1}
                 activeOpacity={0.8}
                 style={{ position: 'relative',
                 width:280,height:35,
                 borderWidth: 1,
                 borderColor: 'transparent', 
                 borderRadius: 10,
                 left:110,
                 zIndex:50,
                 top:100,
               }}
               >  
               </TouchableOpacity>
               <TouchableOpacity
                 onPressIn={handlePressInBg2}
                 onPressOut={handlePressOutBg2}
                 activeOpacity={0.8}
                 style={{ position: 'absolute' ,
                 width:280,height:35,
                 borderWidth: 1,
                 borderColor: 'transparent', 
                 borderRadius: 10,
                 left:500,
                 zIndex:50,
                 top:100,
               }}
               ></TouchableOpacity>
               <TouchableOpacity
                 onPressIn={handlePressInBg3}
                 onPressOut={handlePressOutBg3}
                 activeOpacity={0.8}
                 style={{ 
                 position: 'absolute',
                 width:280,height:35,
                 borderWidth: 1,
                 borderColor: 'transparent', 
                 borderRadius: 10,
                 left:890,
                 top:100,
                 zIndex:50,
               }}
               ></TouchableOpacity>
            </View>
            <View style={styles.scrollContainer}>
            <View style={{flex:1}}>
            <ImageBackground
              source={require('../assets/images/engine/bg_tab_3_1.png')}
              style={{flex: 1,
                width: 1250,
                height: 680,
                left: 10,
                marginTop:30,
                zIndex:zIndex1}}
            >
               <Text style={!isText1 ? TextStyle.txt1 : TextStyle.txt1orange}>
                  T-ECU
              </Text>
                <View style={{flex:1,height:500,}}>
                  <T_ECU itemVal={item.key}/>              
                 </View>
          
              </ImageBackground>
              </View>
              <View style={{flex:2,bottom:150}}>
              <ImageBackground
              source={require('../assets/images/engine/bg_tab_3_2.png')}
              style={{ flex: 1,
                width: 1250,
                height: 680,
                left: 10,
                marginTop:30,
                zIndex:zIndex2}}
            >
              <Text
                style={!isText2 ? TextStyle.txt2 : TextStyle.txt2orange}
              >
                #2
              </Text>
            </ImageBackground>
            </View>
            <View style={{flex:3,bottom:450}}>
            <ImageBackground
              source={require('../assets/images/engine/bg_tab_3_3.png')}
              style={{  flex: 1,
                width: 1250,
                height: 680,
                left: 10,
                marginTop:30,
              zIndex:zIndex3}}
            >
              <Text
                style={!isText3 ? TextStyle.txt3 : TextStyle.txt3orange}
              >
                #3
              </Text>
    
            </ImageBackground> 
            </View>
            </View>
            </SafeAreaView>
          )}
          keyExtractor={(item) => item.key}
        />
      </ImageBackground>
    </View>
  </SafeAreaView>
  );
};
const Imgstyle = {
  bg: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
};
const TextStyle = {
  txt1: {
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
    fontSize: 20,
    left: 200,
    top: 35,
  },
  txt1orange: {
    color: 'orange',
    fontWeight: 'bold',
    position: 'absolute',
    fontSize: 20,
    left: 200,
    top: 35,
  },
  txt2: {
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
    fontSize: 20,
    left: 600,
    top: 35,
  },
  txt2orange: {
    color: 'orange',
    fontWeight: 'bold',
    position: 'absolute',
    fontSize: 20,
    left: 600,
    top: 35,
  },
  txt3: {
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
    fontSize: 20,
    right: 220,
    top: 35,
  },
  txt3orange: {
    color: 'orange',
    fontWeight: 'bold',
    position: 'absolute',
    fontSize: 20,
    right: 220,
    top: 35,
  },
};
const styles = {
  menuButton: {
    position: 'absolute',
    top: 10,
    right: 40,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flex:1,
  },
  default: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 110,
    bottom: 10,
  },
  scrollContainer:{
    flex:1,
    height:900,
  }
};
const BackImageStyle = {
  bg1: {
    flex: 1,
    width: 950,
    height: 480,
    left: 5,
    top: 45,
  },
  bg2: {
    flex: 1,
    width: 950,
    height: 480,
    left: 5,
    top: 45,
  },
  bg3: {
    flex: 1,
    width: 950,
    height: 480,
    left: 5,
    top: 45,
  },
  blueOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'blue',
  },
};
System.propTypes = {
  navigation: PropTypes.object.isRequired,
};
export default React.memo(System);
