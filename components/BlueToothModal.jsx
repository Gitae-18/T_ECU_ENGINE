import React, { useState, useEffect } from 'react';
import {  SafeAreaView,
    StyleSheet,
    View,
    Text,
    StatusBar,
    Platform,
    PermissionsAndroid,
    FlatList,
    TouchableHighlight,
    Pressable,
    NativeModules,NativeEventEmitter, } from 'react-native';
import Modal from "react-native-modal";
import BleManager, {
    BleManagerDidUpdateValueForCharacteristicEvent,
    BleScanCallbackType,
    BleScanMatchMode,
    BleScanMode,
    BleDisconnectPeripheralEvent,
  } from 'react-native-ble-manager';
import styled from 'styled-components/native';
const SECONDS_TO_SCAN_FOR = 7;
const SERVICE_UUIDS = [];
const ALLOW_DUPLICATES = true;
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

BleManagerModule.Peripheral = {};

const BlueToothModal = ({isVisible,closeModal,setModalVisible}) => {
   /*  const [devices, setDevices] = useState([]);
    useEffect(() => {
        if (isVisible) {
          startScanning();
        } else {
          stopScanning();
        }
    
        return () => {
          stopScanning();
        };
      }, [isVisible]);
    
      const startScanning = () => {
        BleManager.start({ showAlert: false })
          .then(() => {
            return BleManager.scan([], 5, true);
          })
          .then(() => {
            console.log('Scanning...');
          })
          .catch((error) => {
            console.error('Error while scanning:', error);
          });
      };
    
      const stopScanning = () => {
        BleManager.stopScan()
          .then(() => {
            console.log('Scan stopped');
          })
          .catch((error) => {
            console.error('Error while stopping scan:', error);
          });
      }; */
      const [isScanning, setIsScanning] = useState(false);
      const [peripherals, setPeripherals] = useState(new Map());
    
    
      const addOrUpdatePeripheral = (id, updatedPeripheral) => {
        setPeripherals(map => new Map(map.set(id, updatedPeripheral)));
      };
    
      const startScan = () => {
        if (!isScanning) {
          setPeripherals(new Map());
    
          try {
            console.debug('[startScan] starting scan...');
            setIsScanning(true);
            BleManager.scan(SERVICE_UUIDS, SECONDS_TO_SCAN_FOR, ALLOW_DUPLICATES, {
              matchMode: BleScanMatchMode.Sticky,
              scanMode: BleScanMode.LowLatency,
              callbackType: BleScanCallbackType.AllMatches,
            })
              .then(() => {
                console.debug('[startScan] scan promise returned successfully.');
                setTimeout(() => {
                  handleStopScan();
                }, SECONDS_TO_SCAN_FOR * 100);
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
        setIsScanning(false);
        BleManager.stopScan();
        console.debug('Scan is stopped');
        return;
      };
    
      const handleDisconnectedPeripheral = event => {
        let peripheral = peripherals.get(event.peripheral);
        if (peripheral) {
          console.debug(
            `[handleDisconnectedPeripheral][${peripheral.id}] previously connected peripheral is disconnected.`,
            event.peripheral,
          );
          addOrUpdatePeripheral(peripheral.id, { ...peripheral, connected: false });
        }
        console.debug(
          `[handleDisconnectedPeripheral][${event.peripheral}] disconnected.`,
        );
      };
    
      const handleUpdateValueForCharacteristic = data => {
        console.debug(
          `[handleUpdateValueForCharacteristic] received data from '${data.peripheral}' with characteristic='${data.characteristic}' and value='${data.value}'`,
        );
      };
    
      const handleDiscoverPeripheral = peripheral => {
        console.debug('[handleDiscoverPeripheral] new BLE peripheral=', peripheral);
        if (!peripheral.name) {
          peripheral.name = 'NO NAME';
        }
        addOrUpdatePeripheral(peripheral.id, peripheral);
      };
      const handleReadData = (peripheral) => {
        BleManager.read(peripheral).then((readData) => {
          console.log("Read: " + readData);
          const buffer = Buffer.from(readData);
	        const sensorData = buffer.readUInt8(1,true);
        })
      }
      const togglePeripheralConnection = async peripheral => {
        if (peripheral && peripheral.connected) {
          try {
            await BleManager.disconnect(peripheral.id);
          } catch (error) {
            console.error(
              `[togglePeripheralConnection][${peripheral.id}] error when trying to disconnect device.`,
              error,
            );
          }
        } else {
          await connectPeripheral(peripheral);
        }
      };
    
      const retrieveConnected = async () => {
        try {
          const connectedPeripherals = await BleManager.getConnectedPeripherals();
          if (connectedPeripherals.length === 0) {
            console.warn('[retrieveConnected] No connected peripherals found.');
            return;
          }
    
          console.debug('[retrieveConnected] connectedPeripherals', connectedPeripherals);
    
          for (var i = 0; i < connectedPeripherals.length; i++) {
            var peripheral = connectedPeripherals[i];
            addOrUpdatePeripheral(peripheral.id, { ...peripheral, connected: true });
          }
        } catch (error) {
          console.error('[retrieveConnected] unable to retrieve connected peripherals.', error);
        }
      };
    
      const connectPeripheral = async peripheral => {
        try {
          if (peripheral) {
            addOrUpdatePeripheral(peripheral.id, { ...peripheral, connecting: true });
    
            await BleManager.connect(peripheral.id);
            console.debug(`[connectPeripheral][${peripheral.id}] connected.`);
    
            addOrUpdatePeripheral(peripheral.id, {
              ...peripheral,
              connecting: false,
              connected: true,
            });
    
            await sleep(900);
    
            const peripheralData = await BleManager.retrieveServices(peripheral.id);
            console.debug(
              `[connectPeripheral][${peripheral.id}] retrieved peripheral services`,
              peripheralData,
            );
    
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
    
      useEffect(() => {
        try {
          BleManager.start({ showAlert: false })
            .then(() => console.debug('BleManager started.'))
            .catch(error =>
              console.error('BeManager could not be started.', error),
            );
        } catch (error) {
          console.error('unexpected error starting BleManager.', error);
          return;
        }            
        const listeners = [
          bleManagerEmitter.addListener(
            'BleManagerDiscoverPeripheral',
            handleDiscoverPeripheral,
          ),
          bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan),
          bleManagerEmitter.addListener(
            'BleManagerDisconnectPeripheral',
            handleDisconnectedPeripheral,
          ),
          bleManagerEmitter.addListener(
            'BleManagerDidUpdateValueForCharacteristic',
            handleUpdateValueForCharacteristic,
          ),
        ];
    
        handleAndroidPermissions();
    
        return () => {
          console.debug('[app] main component unmounting. Removing listeners...');
          for (const listener of listeners) {
            listener.remove();
          }
        };
      }, []);
    
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
    
      const renderItem = ({ item }) => {
        const backgroundColor = item.connected ? '#069400' : '#ffffff';
        return (
          <TouchableHighlight
            underlayColor="#0082FC"
            onPress={() => togglePeripheralConnection(item)}>
            <View style={[styles.row, { backgroundColor }]}>
              <Text style={styles.peripheralName}>
                {item.name} - {item?.advertising?.localName}
                {item.connecting && ' - Connecting...'}
              </Text>
              <Text style={styles.rssi}>RSSI: {item.rssi}</Text>
              <Text style={styles.peripheralId}>{item.id}</Text>
            </View>
          </TouchableHighlight>
        );
      };
    

/*       const [modalVisible, setModalVisible] = useState<boolean>(false); */
      //Output을 State로 받아서 화면에 표출하거나 정보 값으로 활용
      const [modalOutput, setModalOutput] = useState("Open Modal");
      return (
        <StyledSafeAreaView>
          {/* Modal이 StyledModalOpenButto의 아래에 있더라도 무관함. Container안에 들어가만 있으면 됨 */}
          <Modal
            //isVisible Props에 State 값을 물려주어 On/off control
            isVisible={isVisible}
            //아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
            useNativeDriver={true}
            hideModalContentWhileAnimating={true}
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <StyledModalContainer>
              <StyledModalGradeWrapper>
              <StatusBar />
      <SafeAreaView style={styles.body}>
        <Pressable style={styles.scanButton} onPress={startScan}>
          <Text style={styles.scanButtonText}>
            {isScanning ? 'Scanning...' : 'Scan Bluetooth'}
          </Text>
        </Pressable>

        <Pressable style={styles.scanButton} onPress={retrieveConnected}>
          <Text style={styles.scanButtonText}>
            {'Retrieve connected peripherals'}
          </Text>
        </Pressable>

        <Pressable style={styles.scanButton} onPress={handleStopScan}>
          <Text style={styles.scanButtonText}>
            {'Stop scanning'}
          </Text>
        </Pressable>

        {Array.from(peripherals.values()).length === 0 && (
          <View style={styles.row}>
            <Text style={styles.noPeripherals}>
              No Peripherals, press &apos; Scan Bluetooth &apos; above.
            </Text>
          </View>
        )}

        <FlatList
          data={Array.from(peripherals.values())}
          contentContainerStyle={{ rowGap: 12 }}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
              </StyledModalGradeWrapper>
    
              <HorizentalLine />
    
     
    
              
    
              <StyledModalButton
                onPress={() => {
                    closeModal();
                }}
              >
                <Text style={{ alignSelf: "center" }}>취소</Text>
              </StyledModalButton>
            </StyledModalContainer>
          </Modal>
    
          <StyledModalOpenButton
            onPress={() => {
              setModalVisible(true);
            }}
          >
            {/* 모달에서 선택 결과 값을 State로 받아서 화면에 표시 */}
            <StyledModalOutputText> {modalOutput}</StyledModalOutputText>
          </StyledModalOpenButton>
        </StyledSafeAreaView>
      );
}
const boxShadow = {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  };
  
  const styles = StyleSheet.create({
    engine: {
      position: 'absolute',
      right: 10,
      bottom: 0,
      color: 'black',
    },
    scanButton: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
      backgroundColor: '#0a398a',
      margin: 10,
      borderRadius: 12,
      ...boxShadow,
    },
    scanButtonText: {
      fontSize: 20,
      letterSpacing: 0.25,
      color: 'white',
    },
    body: {
      backgroundColor: '#0082FC',
      flex: 1,
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: 'black',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
      color: 'black',
    },
    highlight: {
      fontWeight: '700',
    },
    footer: {
      color: 'black',
      fontSize: 12,
      fontWeight: '600',
      padding: 4,
      paddingRight: 12,
      textAlign: 'right',
    },
    peripheralName: {
      fontSize: 16,
      textAlign: 'center',
      padding: 10,
    },
    rssi: {
      fontSize: 12,
      textAlign: 'center',
      padding: 2,
    },
    peripheralId: {
      fontSize: 12,
      textAlign: 'center',
      padding: 2,
      paddingBottom: 20,
    },
    row: {
      marginLeft: 10,
      marginRight: 10,
      borderRadius: 20,
      ...boxShadow,
    },
    noPeripherals: {
      margin: 10,
      textAlign: 'center',
      color: 'white',
    },
  });  
export default BlueToothModal;
const StyledSafeAreaView = styled.SafeAreaView`
flex:1;
justify-content: center;
align-items: center;
position:absolute;
`;
const StyledModalContainer = styled.View`
    flex-direction: column;
    align-items: center;
    width:320px;
    height:400px;
    background-color:rgba(255,255,255,1);
    border-radius:10px;
`;
const StyledModalButton = styled.TouchableOpacity`
flex:1;
width:320px;
height:100px;
justify-content:center;
`;
const StyledModalGradeWrapper = styled.View`
  flex: 4;
  width: 320px;
  justify-content: center;
`;

const StyledModalGradeText = styled.Text`
  align-self: center;
  font-size: 15px;
`;

const StyledModalText = styled.Text`
  align-self: center;
  color: blue;
  font-size: 15px;
`;
const HorizentalLine = styled.View`
  background-color: black;
  height: 1px;
  align-self: stretch;
`;

const StyledModalOpenButton = styled.TouchableOpacity`
  height: 50px;
  width: 60%;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 1);
`;

const StyledModalOutputText = styled.Text`
  color: black;
  font-size: 30px;
`;