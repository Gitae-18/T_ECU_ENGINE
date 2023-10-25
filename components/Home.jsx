import React,{ useState , useRef,  useEffect , useCallback, useLayoutEffect, memo }from 'react';
import { StyleSheet, Text,  View,Image, ImageBackground, /* Pressable, */ Easing as Ease, Animated as Animate, TouchableOpacity, SafeAreaView, ActivityIndicator, NativeModules,
PermissionsAndroid, AppState, 
NativeEventEmitter, Platform} from 'react-native';
import BleManager, {
  BleManagerDidUpdateValueForCharacteristicEvent,
  BleScanCallbackType,
  BleScanMatchMode,
  BleScanMode,
  BleDisconnectPeripheralEvent,
} from 'react-native-ble-manager';
import { setBluetoothData, setFuelData, setCoolantData, setGearData, setRpmData } from './store/bluetoothSlice';
import Sidebar from './Sidebar';
import PropTypes from 'prop-types';
import MainButton from './MainButton';
import BlueToothModal from './BlueToothModal';
import { Gauge_left } from './images/Gauge_left';
import { Gauge_right } from './images/Guage_right';
import { Gear } from './images/Gear';
import { FuelGauge, OilGauge } from './images/Center_guage';
import Animated,{ withTiming, useSharedValue, useAnimatedStyle, withDelay, Easing, useDerivedValue, withSequence,} from 'react-native-reanimated';
import {CrossfadeImage} from 'react-native-crossfade-image';
import PopupModal from './PopupModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import * as Animatable from 'react-native-animatable'; 
import { useSelector } from 'react-redux';
import { selectBluetoothData, selectCoolantData, selectFuelData, selectGearData, selectRpmData, selectPeripheralData, } from './store/bluetoothSlice';
//import { CachedImage } from 'react-native-image-cache-hoc';
import { useDispatch } from 'react-redux';
import { setAlarmData } from './store/alarmSlice';
import FastImage from 'react-native-fast-image';
const SECONDS_TO_SCAN_FOR = 7;
const SERVICE_UUIDS = ['1800','1801','180a','ffe0'];
const ALLOW_DUPLICATES = true;
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
const serviceID = 'ffe0';
const lengthCharacteristic = 'ffe1';
BleManagerModule.Peripheral = {};

  const Home = ({navigation}) =>{
    const [isModalVisible,setModalVisible] = useState(false);
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const [timer,setTimer] = useState('00:00:00');
    const [year,setYear] = useState('00/00/00');
    const [day,setDay] = useState('');
    const [imageSource, setImageSource] = useState(true);
    const [sidebarClick, setSidebarClick] = useState(false);
    const runtimeRef = useRef(0);
    const modeRef = useRef();
    const [currentImage, setCurrentImage] = useState(Gauge_left[0]);
    const week = ['일','월','화','수','목','금','토'];
    const [degree, setDegree] = useState(0);
    const [distance, setDistance] = useState(100);
    //const fuel =/*  useSelector(selectFuelData); */ 10
    //const coolant =/*  useSelector(selectCoolantData); */ 10
    const [increasing, setIncreasing] = useState(true);
    const dispatch = useDispatch();
    const fadeAnim = useRef(new Animate.Value(0)).current;
    const [isScanning, setIsScanning] = useState(false);
    const [peripherals, setPeripherals] = useState(new Map());
    //const [peripheral, setPeripheral] = useState('');
    const peripheral = {"advertising": {"isConnectable": true, "localName": "T03", "manufacturerData": {"CDVType": "ArrayBuffer", "bytes": [Array],
    "data": "AgEKCf8AAJjaYAKwrwMC4P8ECVQwMwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="}, "serviceData": {},
     "serviceUUIDs": ["ffe0"], "txPowerLevel": -2147483648}, "id": "98:DA:60:02:B0:AF", "name": "T03", "rssi": -48}
    //console.log(peripheral);
    const [data, setData] = useState('');
    /* const [bluetoothDataLocal, setBluetoothDataLocal] = useState(0);
    const [rpmData, setRpmDataLocal] = useState(0);
    const [coolantData, setCoolantDataLocal] = useState(0);
    const [fuelData, setFuelDataLocal] = useState(0);
    const [gearData, setGearDataLocal] = useState('N'); */
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [waiting, setWaiting] = useState(null);
/*     const bluetoothData = useSelector(selectBluetoothData);
    const bluetoothData1 = useSelector(selectFuelData);
    const bluetoothData2 = useSelector(selectRpmData);
    const bluetoothData3 = useSelector(selectGearData);
    const bluetoothData4 = useSelector(selectCoolantData); */
    const [speed, setSpeed] = useState(/* useSelector(selectBluetoothData) */0);
    const [right, setRight] = useState(/* useSelector(selectRpmData) */0);
    const [currentRight, setCurrentRight] = useState(right);
    const [gearStat, setGearStat] = useState(/* useSelector(selectGearData) */'N');
    const [fuel, setFuel] = useState(/* useSelector(selectFuelData) */0);
    const [coolant, setCoolant] = useState(/* useSelector(selectCoolantData) */0);
    const [currentSpeed, setCurrentSpeed] = useState(speed);
    //const [speed, setSpeed] = useState(10);
    const [modal, setModal] = useState(false);
    const [up, setUp] = useState(true);
    //const [gearStat, setGearStat] = useState(useSelector(selectGearData));

    const distanceRef = useRef(distance); // distance 상태 변수를 useRef로 변경
    const metersPerUpdate = 10; // 10m마다 업데이트
    //const gearStatValues = ['r3','r2','r1','n','f1','f2','f3'];
    let currentIndex = 0;
    const scale = useSharedValue(1);
    //const progress = withTiming(currentSpeed, { duration: 200, easing: Easing.inOut(Easing.ease) });
    //const num = 24;
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

    const numberOfImages = 29;
    const images = Array.from({ length: numberOfImages }, (_, index) => {
      const imagePath =  `../assets/images/engine/gauge/img_gauge_bg_left_${index}.png`;
      return imagePath;
    });
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
    const addOrUpdatePeripheral = (id, updatedPeripheral) => {
      setPeripherals(map => new Map(map.set(id, updatedPeripheral)));
    };
    


    const updatedAlarmData = useCallback(async() =>{
      const updatedData = {
        seat: true,
        backlight: true,
        battery: true,
        oil_emergency: false,
        emergency: true,
        parking: false,
        oil_temp: true,
        oil_pressure: true,
        coolant_temp: true,
      }
      dispatch(setAlarmData(updatedData));
    },[dispatch])
    const startScan = () => {
      
      if (!isScanning) {
        setPeripherals(new Map());
  
        try {
          console.debug('[startScan] starting scan...');
          setIsScanning(true);
          BleManager.scan(SERVICE_UUIDS, 10, false, {
            matchMode: BleScanMatchMode.Sticky,
            scanMode: BleScanMode.LowLatency,
            callbackType: BleScanCallbackType.AllMatches,
          })
            .then(() => {
              console.debug('[startScan] scan promise returned successfully.');
              setTimeout(() => {
                handleStopScan();
              }, 1000);
            })
            .catch(err => {
              console.error('[startScan] ble scan returned in error', err);
            });
        } catch (error) {
          console.error('[startScan] ble scan error thrown', error);
        }
      }
    };
  
   
    const handleStopScan = () => {
      if(isScanning){
      setIsScanning(false);
      BleManager.stopScan();       
      console.debug('Scan is stopped');
      }
      return ;        
    };
  
    const handleDisconnectedPeripheral = event => {
      BleManager.disconnect(peripheral.id)
      .then(()=>{
        console.log("Disconnected");
      })
      .catch((error) => {
        console.log(error);
      })
    };  
     /*  const writeData = (peripheral) => {
        console.log('writeData 함수가 호출되었습니다');
        BleManager.write(peripheral.id , serviceID,lengthCharacteristic,buffer.toJSON().data,15)
        .then(()=>{
          console.log("Write success");
        })
        .catch((error)=>{
          console.log("Write error:", error);
        });     
      } */
      const handleDiscoverPeripheral = peripheral => {
      console.debug('[handleDiscoverPeripheral] new BLE peripheral=', peripheral.name);
      
      if (!peripheral.name) {
        peripheral.name = 'NO NAME';
      }
      else{
      addOrUpdatePeripheral(peripheral.id, peripheral);
      }
    };
    const handleReadData = (peripheral) => {
      BleManager.startNotification(peripheral.id, serviceID, lengthCharacteristic)
        .then(() => {
          console.log('Notification started');
        })
        .catch(error => {
          console.debug('Notification error', error);
        });
        BleManager.read(peripheral.id, '1800', '2a00').then((readData) => {
          console.log("Read: " + readData);
        })
        .catch((error) => {
          console.log(error);
        })
    }
          
    const connectPeripheral = async peripheral => {       
      try {
        if (peripheral) {
          addOrUpdatePeripheral(peripheral.id, { ...peripheral, connecting: true });
          await BleManager.connect(peripheral.id);
          console.debug(`[connectPeripheral][${peripheral.id}] connected.`);
          console.log('Bluetooth 기기가 연결되었습니다:', peripheral.id);
          addOrUpdatePeripheral(peripheral.id, {
            ...peripheral,
            connecting: false,
            connected: true,
          });
          await sleep(900);
           const peripheralData = await BleManager.retrieveServices(peripheral.id,[SERVICE_UUIDS]);
           console.log(peripheralData);
          const rssi = await BleManager.readRSSI(peripheral.id);
          console.debug(
            `[connectPeripheral][${peripheral.id}] retrieved current RSSI value: ${rssi}.`,
          ); 
          if (peripheralData.characteristics) {
            for (let characteristic of peripheralData.characteristics) {
              if (characteristic.descriptors) {
                for (let descriptor of characteristic.descriptors) {
                  try {
                    let data = await BleManager.readDescriptor(
                      peripheral.id,
                      characteristic.service,
                      characteristic.characteristic,
                      descriptor.uuid,
                    );
                    console.debug(
                      `[connectPeripheral][${peripheral.id}] descriptor read as:`,
                      data,
                    );
                  } catch (error) {
                    console.error(
                      `[connectPeripheral][${peripheral.id}] failed to retrieve descriptor ${descriptor} for characteristic ${characteristic}:`,
                      error,
                    );
                  }
                }
                
              }
            }
           
          }  
          let p = peripherals.get(peripheral.id);
          if (p) {
            addOrUpdatePeripheral(peripheral.id, { ...peripheral, rssi });
          }
        }
      } catch (error) {
        console.error(
          `[connectPeripheral][${peripheral.id}] connectPeripheral error`,
          error,
        );
      }
    };
  
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    const handleAndroidPermissions = () => {
      if (Platform.OS === 'android' && Platform.Version >= 31) {
        PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        ]).then(result => {
          if (result) {
            console.debug(
              '[handleAndroidPermissions] User accepts runtime permissions android 12+',
            );
          } else {
            console.error(
              '[handleAndroidPermissions] User refuses runtime permissions android 12+',
            );
          }
        });
      } else if (Platform.OS === 'android' && Platform.Version >= 23) {
        PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ).then(checkResult => {
          if (checkResult) {
            console.debug(
              '[handleAndroidPermissions] runtime permission Android <12 already OK',
            );
          } else {
            PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            ).then(requestResult => {
              if (requestResult) {
                console.debug(
                  '[handleAndroidPermissions] User accepts runtime permission android <12',
                );
              } else {
                console.error(
                  '[handleAndroidPermissions] User refuses runtime permission android <12',
                );
              }
            });
          }
        });
      }
    };
    const initBluetooth = async () => {
      try {
        await BleManager.start({ showAlert: false });
        console.debug('BleManager started.');
  
        // BleManager가 시작된 후에 다음 작업을 수행하도록 호출
        handleAndroidPermissions();    
        connectPeripheral(peripheral);       
      } catch (error) {
        console.error('BleManager could not be started.', error);
        return;
      }              
    // Function to convert bytes array to string                  
    };
    useEffect(() => {    
      handleReadData(peripheral);
      bleManagerEmitter.addListener(
        "BleManagerDidUpdateValueForCharacteristic",
        ({ value, peripheral, characteristic, service }) => {
          // Convert the received bytes to a string or process the data as needed
          function bytesToString(bytes) {
            // You can use your own logic to convert bytes to a string
            return String.fromCharCode.apply(null, new Uint8Array(bytes));
          }
          const data = bytesToString(value);
          const speedval = data[0] + data[1];
          const rpmval = data[2] + data[3];
          const gearval = data[4] + data[5];
          const fuelval = data[6] + data[7];
          const coolantval = data[8] + data[9];
          setSpeed(parseInt(speedval));
          setRight(parseInt(rpmval));
          setGearStat(gearval);
          setFuel(parseInt(fuelval));
          setCoolant(parseInt(coolantval));
          console.log(data);
        }
      ) 
      const listeners = [
        bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral),
        bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan),       
      ];
    
      return () => {
        console.debug('[app] main component unmounting. Removing listeners...');
        for (const listener of listeners) {
          listener.remove();
        }
      };
    
    }, [isConnected]);

    useLayoutEffect(() => {
      let animationFrameId;
    
      const updateDegree = () => {
        const currentDegree = degree;
        let targetDegree = 0;
    
        switch (gearStat) {
          case 'r3':
            targetDegree = -75;
            break;
          case 'r2':
            targetDegree = -50;
            break;
          case 'r1':
            targetDegree = -25;
            break;
          case 'n':
            targetDegree = 0;
            break;
          case 'f1':
            targetDegree = 25;
            break;
          case 'f2':
            targetDegree = 50;
            break;
          case 'f3':
            targetDegree = 75;
            break;
          default:
            break;
        }    
        const degreeDifference = targetDegree - currentDegree;
        const stepSize = degreeDifference / 21;
    
        setDegree((prevDegree) => {
          const newDegree = prevDegree + stepSize;
    
          if ((stepSize > 0 && newDegree >= targetDegree) || (stepSize < 0 && newDegree <= targetDegree)) {
            return targetDegree;
          }
    
          animationFrameId = requestAnimationFrame(updateDegree);
          return newDegree;
        });
      };
    
      updateDegree();
    
      return () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    }, [gearStat]);
  
    const storeDistance = async (value) => {
      try {
        await AsyncStorage.setItem('distance', value);
      } catch (e) {
        console.log(e);
      }
    };
    const fetchStoredDistance = async () => {
      try {
        const storedDistance = await AsyncStorage.getItem('distance');
        console.log(storedDistance);
        if (storedDistance !== null) {
          // AsyncStorage에서 저장된 거리를 가져와 누적된 값으로 설정
          distanceRef.current = parseFloat(storedDistance);
          console.log(storedDistance)
          setDistance(storedDistance);
        } else {
          // 저장된 거리가 없을 때 기본값 설정
          distanceRef.current = 0;
          setDistance('0');
        }
      } catch (e) {
        console.log(e);
      }
    };
    useEffect(() => {
      // 화면이 mount(생성)될 때 저장된 거리를 가져와서 설정
      fetchStoredDistance();
  
      const interval = setInterval(() => {
        // 1초 동안 갈 거리 계산 (1시간 동안의 이동 거리를 3600으로 나눠서 초당 이동 거리 계산)
        const distanceIncrement = (speed / 3600) * 1; // 1초 동안 이동한 거리 (단위: km)

        // 기존 거리에 더하기

        distanceRef.current += distanceIncrement
        // 소수점 둘째 자리까지 표시하고, 소수 부분이 0일 경우 0을 유지
        const formattedDistance = distanceRef.current.toFixed(2);

        setDistance(formattedDistance);
        
        // 1초마다 distance 값을 AsyncStorage에 저장
        if(formattedDistance === 'NaN'){
        storeDistance('0');
        }
        else{
        storeDistance(formattedDistance);
        }        
      }, 1000); // 1초마다 업데이트
  
      // 화면이 unmount(사라질)될 때 interval 정리
      return () => {
        clearInterval(interval);
      };
    }, [speed,right,gearStat,fuel,coolant]);
    useEffect(() => {
      const timerId = setInterval(() => {
        runtimeRef.current += 1;
      }, 990);     
      return () => clearInterval(timerId);
    }, [navigation]);
    const modeChange = () => {
      setImageSource(!imageSource);
    }
    const toggleModal = () => {
      setIsConnected(true);
      setModalVisible(true);
    }
    const closeModal = () =>{
      setModalVisible(false);
    }
    const closeModal2 = () => {
      setModal(false);
    }
    const formatTime = (timeInSeconds) => {
      const hours = Math.floor(timeInSeconds / 3600);
      const minutes = Math.floor((timeInSeconds % 3600) / 60);
      const seconds = timeInSeconds % 60;
  
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
   
    useEffect(()=>{
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
      const interval = setInterval(() => {
          if (currentSpeed < speed) {
            //setCurrentSpeed((prevSpeed) => prevSpeed + 1);
            setCurrentSpeed((prevSpeed) => prevSpeed + 1);
          } 
          else if( currentSpeed > speed)
          {
            setCurrentSpeed((prevSpeed) => prevSpeed - 1);
          }
          if (currentRight< right) {
            //setCurrentSpeed((prevSpeed) => prevSpeed + 1);
            setCurrentRight((prevRight) => prevRight + 1);
          } 
          else if( currentRight > right)
          {
            setCurrentRight((prevRight) => prevRight - 1);
          }
      }, 10);
     
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
      return () => {
        clearInterval(interval);
      };
    }, [currentSpeed,speed,right,currentRight]);
    
 
    const ViewPopup = () => {
        setModal(true);
        
    }
    
  useLayoutEffect(() => {
    Animate.timing(fadeAnim, {
      toValue: imageSource?1:0,
      duration: 1000, // Adjust the duration as needed
      useNativeDriver: true,
    }).start();
  }, [fadeAnim,imageSource,navigation,images]); 
  
    return(
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: 'black',
        flexDirection: 'row',
      }}>
      <View style={ImgStyle.content}>
    <View>
      <ImageBackground source={require('../assets/images/engine/Homescreen.png')} style={Imgstyle.bg} resizeMode="stretch">
      <View style={styles.top}>
        <ImageBackground source={require('../assets/images/engine/gear/img_gear_bg.png')} style={Imgstyle.top_gear}>
        <Animated.Image resizeMode="stretch" source={require('../assets/images/engine/gear/img_gear_text.png')} 
        style={{width:'100%',height:'100%',top:0, transform: [{ rotate: `${degree}deg` }],}}/>       
        </ImageBackground>    
        <Image resizeMode="stretch" source={imageSource?require('../assets/images/engine/gear/img_mode_manual.png'):require('../assets/images/engine/gear/img_mode_auto.png')} 
        style={imageSource?GearImg.mode:GearImg.mode2}/>
         <FastImage  resizeMode="contain" source={Gear[gearStat]} style={{width:80,height:340,bottom:455, left:440,}}/>
        
      </View>      
      <View style={styles.imagesContainer}>
      <View style={styles.left}>
    
        {isLoading ? ( <ActivityIndicator size="large" color="#0000ff"/>):
        (<CrossfadeImage source={Gauge_left[currentSpeed]} style={Imgstyle.left_gauge}  duration={50} easing={Ease.ease}
          blurRadius={0}/>)
        }
      </View>
        <View style={styles.center}>
        <ImageBackground source={require('../assets/images/engine/img_center_gauge_bg.png')} style={Imgstyle.center_gauge}>
            <View style={styles.imageContainer}>
              <FastImage resizeMode="center" source={FuelGauge[fuel]} style={Imgstyle.center_left}/>
                <View style={styles.imageContainer}>
                 <Image resizeMode='stretch' source={require('../assets/images/engine/common/fuelgauge_36.png')} style={Imgstyle.fuel}/>
                 <Image resizeMode='stretch' source={require('../assets/images/engine/common/center_coolant_temp_36.png')} style={Imgstyle.coolant}/>
                </View>
              <FastImage resizeMode="center" source={OilGauge[coolant]} style={Imgstyle.center_right}/>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.right}>
        {isLoading ? ( <ActivityIndicator size="large" color="#0000ff"/>):
        (
        <FastImage
        source={Gauge_right[currentRight]}
        duration={50} easing={Ease.ease}
        blurRadius={0}
        style={{
        width:380,
        height:380,
        alignItems: 'center',
        justifyContent: 'center',
        right:60}}
      />)}
        </View>
        <MainButton/>
        <View>
        <TouchableOpacity onPress={ViewPopup} style={{width:100 ,height:50, borderWidth:1, borderColor:'transparent',flex:1,position:'absolute', right:460, top:245, }}>
        {!modal&&<Image resizeMode='stretch' source={require('../assets/images/engine/img_bottom_popup_btn.png')} style={{position:'relative',width:150,height:45,}}/>}
        </TouchableOpacity>
        {modal&&<PopupModal visible={modal} close={closeModal2} style={{top:200,}}/>}
        </View>
        <View style={TextStyle.distance}>
        <Text style={TextStyle.text}>주행거리</Text>
        <Text style={TextStyle.way}>{distance}km</Text>
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

        <TouchableOpacity style={{ position: 'absolute',left:200,top:2,alignItems: 'center',justifyContent: 'center',}} onPress={initBluetooth/* toggleModal */}>
        {/* {isModalVisible&&<BlueToothModal isVisible={isModalVisible} transparent={true} closeModal={closeModal} setModalVisible={setModalVisible}/>} */}
        <Image resizeMode='stretch' source={require('../assets/images/engine/bluetooth.png')} style={{ height:40,width:80,}}/>
        </TouchableOpacity>
        <TouchableOpacity style={{ position: 'absolute',right: 130,top:2,alignItems: 'center',justifyContent: 'center',}}>
        <Image resizeMode='stretch' source={require('../assets/images/engine/img_voice_btn.png')} style={{ height:48,width:100,}}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={toggleSidebar} onPressIn={()=>setSidebarClick(true)} onPressOut={()=>setSidebarClick(false)}>
        <ImageBackground source={require('../assets/images/engine/Rectangle_90.png')} style={styles.default} resizeMode="contain">
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
const GearImg = StyleSheet.create({
  mode:{
    width:140,
    height:40,
    top:15,
    left:410,
    position:'absolute'
  },
  mode2:{
    width:120,
    height:35,
    bottom:55,
    left:142,
  },
});
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
    height:400,
    bottom:250,
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
    bottom:100,
  }
}
const TextStyle = {
  clock:{
    position:'absolute',
    flex:1,
    bottom:-80,
    right:10,
    zIndex:0
  },
  distance:{
    position:'absolute',
    flex:1,
    bottom:-78,
    marginLeft:25,
    zIndex:0
  },
  running_time:{
    position:'absolute',
    flex:1,
    bottom:-80,
    left:160,
    zIndex:0
  },
  year:{
    position:'absolute',
    flex:1,
    bottom:-80,
    right:140,
    zIndex:0
  },
  way:{
    color:'orange',
    fontSize:22,
    fontFamily:'Inter',
    textAlign:'right'
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