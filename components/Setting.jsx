import React,{ useState , /* useRef, useEffect , useCallback  */}from 'react';
import { StyleSheet, Text,  View,Image, ImageBackground, /* Pressable, */ TouchableOpacity, /* Animated, */ FlatList} from 'react-native';
import Sidebar from './Sidebar';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native-safe-area-context';
import JerkPrevent from './Setting/JerkPrevent';
const Setting = ({navigation}) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [zIndex1, setZIndex1] = useState(1);
  const [zIndex2, setZIndex2] = useState(2);
  const [zIndex3, setZIndex3] = useState(3);
  const [zIndex4, setZIndex4] = useState(4);
  const [zIndex5, setZIndex5] = useState(5);
  const [isText1, setIsText1] = useState(false);
  const [isText2, setIsText2] = useState(false);
  const [isText3, setIsText3] = useState(false);
  const [isText4, setIsText4] = useState(false);
  const [isText5, setIsText5] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };
  const handlePressText1 = () => {
    setZIndex1(5);
    setZIndex2(4);
    setZIndex3(3);
    setZIndex4(2);
    setZIndex5(1);
    setIsText1(true);
  };
  
  const handlePressText2 = () => {
    setZIndex1(4);
    setZIndex2(5);
    setZIndex3(3);
    setZIndex4(2);
    setZIndex5(1);
    setIsText2(true);
  };
  
  const handlePressText3 = () => {
    setZIndex1(3);
    setZIndex2(4);
    setZIndex3(5);
    setZIndex4(2);
    setZIndex5(1);
    setIsText3(true);
  };
  const handlePressText4 = () => {
    setZIndex1(2);
    setZIndex2(3);
    setZIndex3(4);
    setZIndex4(5);
    setZIndex5(1);
    setIsText4(true);
  };
  
  const handlePressText5 = () => {
    setZIndex1(1);
    setZIndex2(2);
    setZIndex3(3);
    setZIndex4(4);
    setZIndex5(5);
    setIsText5(true);
  };
  const handlePressOut1 = () => {
    setIsText1(false);
  };
 
  const handlePressOut2 = () => {
    setIsText2(false);
  };


  const handlePressOut3 = () => {
    setIsText3(false);
  };
  const handlePressOut4 = () => {
    setIsText4(false);
  };
  const handlePressOut5 = () => {
    setIsText5(false);
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
  const handlePressInBg4 = () => {
    handlePressText4();
  };
  const handlePressOutBg4 = () => {
    handlePressOut4();
  };
  const handlePressInBg5 = () => {
    handlePressText5();
  };
  const handlePressOutBg5 = () => {
    handlePressOut5();
  };
    return(
      <SafeAreaView style={{ flex: 1, backgroundColor: 'black', flexDirection: 'row' }}>
      <View style={{ flex: 1 }}>
        <ImageBackground source={require('../assets/images/engine/Homescreen.png')} style={Imgstyle.bg} resizeMode='stretch'>
          <TouchableOpacity style={styles.menuButton} onPress={toggleSidebar}>
          <ImageBackground source={require('../assets/images/engine/Rectangle_90.png')} style={styles.default} resizeMode="contain">
                 <Image resizeMode='center' source={require('../assets/images/engine/menu.png')} style={Imgstyle.menu}
                  ></Image>
                 </ImageBackground>
          </TouchableOpacity>
          {isSidebarVisible && <Sidebar style={{ zIndex: 1000 }} visible={isSidebarVisible} setSidebar={setSidebarVisible} navigation={navigation} />}
          <View style={{zIndex:99,top:70}}>
              <TouchableOpacity
                   onPressIn={handlePressInBg1}
                   onPressOut={handlePressOutBg1}
                   activeOpacity={0.8}
                   style={{ position: 'absolute',
                   width:190,height:35,
                   borderWidth: 1,
                   borderColor: 'transparent', 
                   borderRadius: 10,
                   top:35,
                   left:65,
                   zindex:50,
                 }}
                 >  
                 </TouchableOpacity>
                 <TouchableOpacity
                   onPressIn={handlePressInBg2}
                   onPressOut={handlePressOutBg2}
                   activeOpacity={0.8}
                   style={{ position: 'absolute' ,
                   width:190,height:35,
                   borderWidth: 1,
                   borderColor: 'transparent', 
                   borderRadius: 10,
                   left:300,
                   top:35,
                   zindex:50,
                 }}
                 ></TouchableOpacity>
                 <TouchableOpacity
                   onPressIn={handlePressInBg3}
                   onPressOut={handlePressOutBg3}
                   activeOpacity={0.8}
                   style={{ 
                   position: 'absolute',
                   width:190,height:35,
                   borderWidth: 1,
                   borderColor: 'transparent', 
                   borderRadius: 10,
                   top:35,
                   left:540,
                   zindex:50,
                 }}
                 ></TouchableOpacity>
                 <TouchableOpacity
                   onPressIn={handlePressInBg4}
                   onPressOut={handlePressOutBg4}
                   activeOpacity={0.8}
                   style={{ 
                   position: 'absolute',
                   width:190,height:35,
                   borderWidth: 1,
                   borderColor: 'transparent', 
                   borderRadius: 10,
                   top:35,
                   left:770,
                   zindex:50,
                 }}
                 ></TouchableOpacity>
                 <TouchableOpacity
                   onPressIn={handlePressInBg5}
                   onPressOut={handlePressOutBg5}
                   activeOpacity={0.8}
                   style={{ 
                   position: 'absolute',
                   width:190,height:35,
                   borderWidth: 1,
                   borderColor: 'transparent', 
                   borderRadius: 10,
                   top:35,
                   right:85,
                   zindex:50,
                 }}
                 ></TouchableOpacity>
              </View> 
          <FlatList
            style={{ flex: 1, paddingVertical: 10, top: 45 }}
            data={[
              { key: 'tab1', text: 'T-ECU', left: 30, onPressIn: handlePressInBg1, onPressOut: handlePressOutBg1 },
              /* { key: 'tab2', text: 'Oil Filter', left: 50, onPressIn: handlePressInBg2, onPressOut: handlePressOutBg2 },
              { key: 'tab3', text: 'Oil Pressure', left: 670, onPressIn: handlePressInBg3, onPressOut: handlePressOutBg3 },
              { key: 'tab4', text: 'Anti Rollback', left: 670, onPressIn: handlePressInBg4, onPressOut: handlePressOutBg4 },
              { key: 'tab5', text: 'Jerk Prevent', left: 670, onPressIn: handlePressInBg5, onPressOut: handlePressOutBg5 }, */
            ]}
            renderItem={({ item }) => (
              <View>
              <View style={styles.scrollContainer}>
              <View style={{flex:1}}>
              <ImageBackground
                source={require('../assets/images/engine/bg_tab_5_1.png')}
                style={{flex: 1,
                  width: 1250,
                  height: 680,
                  top:25,
                  left: 5,
                  zIndex:zIndex1}}
                resizeMode='stretch'
              >
                 <Text style={!isText1 ? TextStyle.txt1 : TextStyle.txt1orange}>
                    T-ECU
                </Text>
                  <View style={{flex:1}}>

                   </View>
            
                </ImageBackground>
                </View>
                <View style={{flex:2 , bottom:60}}>
                <ImageBackground
                source={require('../assets/images/engine/bg_tab_5_2.png')}
                style={{ flex: 1,
                  width: 1250,
                  height: 680,
                  left: 5,
                  top: 25,
                  zIndex:zIndex2}}
                  resizeMode='stretch'
              >
                <Text
                  style={!isText2 ? TextStyle.txt2 : TextStyle.txt2orange}
                >
                  Oil Filter
                </Text>
              </ImageBackground>
              </View>
              <View style={{flex:3, bottom:180}}>
              <ImageBackground
                source={require('../assets/images/engine/bg_tab_5_3.png')}
                style={{  flex: 1,
                  width: 1250,
                  height: 680,
                  left: 5,
                  top: 25,
                zIndex:zIndex3}}
                resizeMode='stretch'
              >
                <Text
                  style={!isText3 ? TextStyle.txt3 : TextStyle.txt3orange}
                >
                  Oil Pressure
                </Text>
      
              </ImageBackground> 
              </View>
              <View style={{flex:4, bottom:360}}>
              <ImageBackground
                source={require('../assets/images/engine/bg_tab_5_4.png')}
                style={{  flex: 1,
                  width: 1250,
                  height: 680,
                  left: 5,
                  top: 25,
                zIndex:zIndex4}}
                resizeMode='stretch'
              >
                <Text
                  style={!isText4 ? TextStyle.txt4 : TextStyle.txt4orange}
                >
                  Anti Rollback
                </Text>
      
              </ImageBackground> 
              </View>
              <View style={{flex:5, bottom:600,}}>
              <ImageBackground
                source={require('../assets/images/engine/bg_tab_5_5.png')}
                style={{  flex: 1,
                  width: 1250,
                  height: 680,
                  left: 5,
                  top: 25,
                zIndex:zIndex5}}
                resizeMode='stretch'
              >
                <Text
                  style={!isText5 ? TextStyle.txt5 : TextStyle.txt5orange}
                >
                  JerkPrevent
                </Text>
                <View style={{flex:1}}>
                  <JerkPrevent/>
                 </View>
              </ImageBackground> 
              </View>
              </View>
              </View>
            )}
            keyExtractor={(item) => item.key}
            ListHeaderComponent={
            <View></View>
            }
            ListFooterComponent={
            <View></View>
            }
          />
        </ImageBackground>
      </View>
    </SafeAreaView>
    )
}
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
    left: 123,
    top: 45,
  },
  txt1orange: {
    color: 'orange',
    fontWeight: 'bold',
    position: 'absolute',
    fontSize: 20,
    left: 123,
    top: 45,
  },
  txt2: {
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
    fontSize: 20,
    left: 343,
    top: 45,
  },
  txt2orange: {
    color: 'orange',
    fontWeight: 'bold',
    position: 'absolute',
    fontSize: 20,
    left: 343,
    top: 45,
  },
  txt3: {
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
    fontSize: 20,
    left: 560,
    top: 45,
  },
  txt3orange: {
    color: 'orange',
    fontWeight: 'bold',
    position: 'absolute',
    fontSize: 20,
    left: 560,
    top: 45,
  },
  txt4: {
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
    fontSize: 20,
    right:320,
    top: 45,
  },
  txt4orange: {
    color: 'orange',
    fontWeight: 'bold',
    position: 'absolute',
    fontSize: 20,
    right:320,
    top: 45,
  },
  txt5: {
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
    fontSize: 20,
    right:95,
    top: 45,
  },
  txt5orange: {
    color: 'orange',
    fontWeight: 'bold',
    position: 'absolute',
    fontSize: 20,
    right:95,
    top: 45,
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
    bottom:20,
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
  transparentOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
};
Setting.propTypes = {
    navigation: PropTypes.object.isRequired
  }
export default React.memo(Setting);