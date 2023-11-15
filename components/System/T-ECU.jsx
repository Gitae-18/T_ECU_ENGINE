import React, {useState,useCallback, useRef, useEffect} from 'react';
import ApplicantModal from './ApplicantModal';
import ConnectModal from './ConnectModal';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  //Pressable,
  TouchableOpacity,
  //Animated,
  SafeAreaView,
  //Button,
  ScrollView,
  //TouchableWithoutFeedback,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {ScrollView as GestureHandlerScrollView} from 'react-native-gesture-handler';
import GestureHandlerRootView from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import ModifyModal from './ModifyModal';
import firestore from '@react-native-firebase/firestore';
import {initializeApp,firebase} from '@react-native-firebase/app';
import {getFirestore} from '@react-native-firebase/firestore';
import { useDispatch } from 'react-redux';
import { setVehicleAmount } from '../store/VehicleAmount';
import {collection, addDoc , getDocs, serverTimestamp,deleteDoc,doc,} from "@react-native-firebase/firestore";
import { useLayoutEffect } from 'react';
if(!firebase.apps.length){
  initializeApp();
}
const db = getFirestore();
const T_ECU = ({itemVal}) =>{
    //const windowWidth = Dimensions.get('window').width;
    //const [pickerValue, setPickerValue] = useState("등록된 T-ECU ID");
    const [logs, setLogs] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedItemId, setSelectedItemId] = useState('');
    const [selectedItemname, setSelectedItemName] = useState('');
    const [modifyModal,setModifyModal] = useState(false);
    const [connectModal, setConnectModal] = useState(false);
    const [openIp, setOpenIp] = useState(false);
    const [addModel, setAddModel] = useState(false);
    const [value, setValue] = useState('등록된 T-ECU ID');
    const [val, setVal] = useState('IP-Address');
    const [len, setLen] = useState(0);
    const [key,setKey] = useState([]);
    const [connecting, setConnecting] = useState(false);
    const [device, setDevice] = useState([]);
    const isMountedRef = useRef(true);
    const dispatch = useDispatch();
    const [items, setItems] = useState([
        {label: '등록된 T-ECU ID', value:'default'},
        ]);
    const [ip, setIp] = useState([
        {label: 'IP-Address', value: 0},
        {label: 'AA:BB:CC:DD:11:22', value: 1},
        {label: 'EE:FF:GG:HH:44:77', value: 2},
        {label: 'II:JJ:KK:KK:13:63', value: 3},
       ]);

      //const usersCollectionRef = collection(db,'users');
        
      const onClear = () => {
            setLogs([]); // logs 배열을 빈 배열로 초기화하여 모든 로그를 지웁니다.
      };
      const onSavefetch = useCallback(async() => {
          dispatch(setVehicleAmount(len))
      },[dispatch,len])

      const updatedItems = useCallback(async()=>{
        const updateItems = device.map((item,index) => ({
        label: item.name,
        value: index,
      }));
      setItems(updateItems);
      },[device])

      
      useEffect(()=>{
        isMountedRef.current = true;
        const fetchUsers = async() => {
          if(!isMountedRef.current) return;
          try{
            setLoading(true);
            const usersCollectionRef = collection(db,'users');
            const userSnap = await getDocs(usersCollectionRef);
            setLen(userSnap.docs.length);
           // console.log(userSnap)
            const data = userSnap.docs.map(doc => ({
              id:doc.id,
              name: doc.data().name,
              model: doc.data().model,
              type: doc.data().type,
              MAC: doc.data().MAC,
              productor: doc.data().productor,
              created: doc.data().created,
            }));
            setDevice(data);
            setLoading(false);
          }
          catch(error){
            console.log(error);
          }
          return() => setLoading(false);
        };
        fetchUsers();
        onSavefetch();
        return () => {
          isMountedRef.current = false;
          setConnecting(false);
        }
      },[onSavefetch]);
      const addLog = useCallback(async (log) => {
        try {
          setLogs((prevLogs) => [...prevLogs, { log: log, temp: "key" + prevLogs.length + 1 }]);
          await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (e) {
          console.log(e);
        }
      },[])
      const onConnect = async() => {
        try{
        setConnecting(true);
        await addLog(`[${getCurrentDateTime()}] Attempt to ${ip[val].label} Connecting........`);
        // 실제 연결 및 데이터 처리 로직
        await addLog(`[${getCurrentDateTime()}] Success Connected 211.246.74.11`);
        console.debug('connected');
        //        setConnectModal(true);
        }
        catch(e){
          console.log(e);
        }
      }
      const onDeconnect = async() => {
        try{
        setConnecting(false);
        await addLog(`[${getCurrentDateTime()}] End Received T-ECU data .......`);
        await addLog(`[${getCurrentDateTime()}] End Preprocessing .......`); 
        //setId((prevIds) => prevIds.slice(0, prevIds.length - 1));
        console.debug('disconnected');
        }
        catch(e)
        {
          console.log(e);
        }
      }
      const handleModifyPress = (itemId,itemName) => {
        setModifyModal(true);
        // itemId를 modifyModal 컴포넌트로 전달합니다.
        // itemId를 상태 변수에 저장하거나 컴포넌트에서 직접 사용할 수 있습니다.
        // 예를 들어, 상태 변수에 저장하는 방법은 다음과 같습니다:
        setSelectedItemId(itemId);
        setSelectedItemName(itemName);
        console.log(modifyModal);
      };
      const handleModal = () => {
        setConnectModal(false);
      }
      const closeModal = () => {
        setAddModel(false);
      }
      const closeModify = () => {
        setModifyModal(false);
      }
      const onDelete = useCallback(async(id) => {
        await deleteDoc(doc(db, 'users', id))
        console.log("삭제되었습니다.")
      },[])
     
      const getCurrentDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      };
      const OnAddVehicle = () =>{
        return(
          <View style={{flex:1,flexDirection:'row',marginTop:50,marginLeft:100,}}>
         <View style={{flex:1,left:20,marginTop:50,}}>
                {device ? device.map((item, index) => (
                  <View key={item.id} style={{margin:0, padding:0,height:50,marginTop:10,}}>
                  <ImageBackground source={require('../../assets/images/engine/img_table_box_outer.png')} style={{width:900,height:50,justifyContent:'center',alignItems:'baseline',top:27}}>
                  <View style={{flexDirection:'row'}}>
                  <Text style={{color:'white',fontSize:16,flex:1,left:8}}>{item.name}</Text>
                  <Text style={{color:'white',fontSize:16,flex:1,left:8}}>{item.model}</Text>
                  <Text style={{color:'white',fontSize:16,flex:0.6 ,left:9}}>{item.type}</Text>
                  <Text style={{color:'white',fontSize:16,flex:2,left:8}}>{item.MAC}</Text>
                  <Text style={{color:'white',fontSize:16,flex:1,left:8}}>{item.productor}</Text>
                  <Text style={{color:'white',fontSize:16,flex:2,left:10}}>{item.created}</Text>
                  </View>
                  </ImageBackground>
                  <TouchableOpacity style={{left:920,bottom:20}} onPress={()=> handleModifyPress(item.id,item.name)}>
                    <ImageBackground source={require('../../assets/images/engine/img_table_box_btn.png')} style={{width:100,height:50,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'white',fontSize:18}}>수정</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                 
                  <TouchableOpacity style={{left:1020,bottom:70}} onPress={()=>onDelete(item.id)}>
                    <ImageBackground source={require('../../assets/images/engine/img_table_box_btn.png')} style={{width:100,height:50,justifyContent:'center',alignItems:'center'}}>
                      <Text style={{color:'white',fontSize:18}}>삭제</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                  </View>
               )):(
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <ActivityIndicator size="large" color="blue" />
                  </View>
               )}                
               </View>               
         </View>
        )
      }
return(
 
    <View style={{flex:1}}>
 
     <Text style={textStyle.text1}>· T-ECU 연결관리</Text>
      
     <SafeAreaView>
      <DropDownPicker style={{backgroundColor:'#161413',width:200,left:270,top:90,color:'white'}} placeholderStyle={{
        color: "white",
        fontWeight: "bold"
      }}
        defaultValue={value}
        arrowIconStyle={{marginRight:5,tintColor:'white'}}
        placeholder="등록된 T-ECU ID"
        onPress={updatedItems}
        labelStyle={{color: 'white',fontWeight:'bold'}}
        open={open} items={items} value={value} setOpen={setOpen} setValue={setValue} setItems={setItems} dropDownDirection="BOTTOM"dropDownContainerStyle={{
        backgroundColor: "#dfdfdf",width:200,left:270,top:140,
        }}/>
     </SafeAreaView>
      <Text style={textStyle.text2}>·MAC Address</Text>
      <DropDownPicker style={{backgroundColor:'#161413',width:300,height:50,top:40,left:750,color:'white'}} placeholderStyle={{
        color: "white",
        fontWeight: "bold"
      }}
        defaultValue={val}
        arrowIconStyle={{marginRight:5,tintColor:'white'}}
        placeholder="IP-Address"
        labelStyle={{color: 'white'}}
        open={openIp} items={ip} value={val} setOpen={setOpenIp} setValue={setVal} setItems={setIp} dropDownDirection="BOTTOM"dropDownContainerStyle={{
        backgroundColor: "#dfdfdf",width:220,left:550,
        }}/>

      <View style={{flexDirection: 'row', bottom:5}}>
      <TouchableOpacity  style={{height:40,left:770,bottom:40,  borderWidth: 1,borderColor: 'transparent', }} onPress={connecting ? null : onConnect}>
          <View style={{justifyContent:'center',alignItems:'center'}}>
            <ImageBackground source={require('../../assets/images/engine/basic_btn.png')} style={styles.image}>
            <Text style={styles.text}>연결</Text>
            </ImageBackground>
          </View>         
      </TouchableOpacity>
      <TouchableOpacity  style={{height:40,left:775,bottom:40,}} onPress={ onDeconnect }>
          <View style={{justifyContent:'center',alignItems:'center'}}>
            <ImageBackground source={require('../../assets/images/engine/basic_btn.png')} style={styles.image}>
            <Text style={styles.text}>끊기</Text>
            </ImageBackground>
          </View>         
      </TouchableOpacity>
      </View>
      <View style={{flex:1 ,flexDirection:'row'}}>
      <Text style={textStyle.text3}>· 접속 Log 정보</Text>  
      <TouchableOpacity style={{height:50, left:240, bottom:-5, position:'relative',borderWidth:1,borderColor:'transparent'}} onPress={onClear}>
        <ImageBackground source={require('../../assets/images/engine/basic_btn.png')} resizeMode='stretch'style={{width:70,height:40,justifyContent:'center',}} >
        <Text style={{textAlign:'center',color:'white'}}>Clear</Text>
        </ImageBackground>
        </TouchableOpacity>
        </View>
        {connectModal&& <ConnectModal close={handleModal} visible={connectModal}/>}
      <View style={{ width:900,height:350,top:20,}}>
      <ImageBackground source={require('../../assets/images/engine/bg_table_off.png')} style={{width:1100,height:430,left:70,top:30,}} imageStyle={{borderRadius:10}}> 
        <FlatList style={{flex:1,}}  nestedScrollEnabled={true}
        data = {logs}
        overScrollMode="always"
        contentContainerStyle={{ paddingBottom:20, flexGrow:1, height: '100%'}}
        keyExtractor={(item)=> item.temp.toString()}
        renderItem={({item,index})=>(
          <View style={{color: 'white',fontSize: 20, padding:10}}>
               <Text style={{ color: 'white', fontSize: 20 }}>
                {item.log}
              </Text>
           </View> 
        )}
        listKey={(item,index) => 'item'+index.toString()}
        />                         
        </ImageBackground>  
        </View> 
        <View style={{flex:1,top:170}}>
                      <Image source={require('../../assets/images/engine/img_divider_line.png')} style={{width:1260}}></Image>
        </View>
        <View style={{ flex:1 , maxHeight:2000,marginTop:130}}>
        <Text style={textStyle.text5}>· 차량 등록 정보</Text>
        <TouchableOpacity style={{borderWidth:1,borderColor:'transparent',width:100,height:50,top:60,left:1030}}onPress={()=>setAddModel(true)}>
          <ImageBackground source={require('../../assets/images/engine/basic_btn.png')} style={{width:120,height:60,justifyContent:'center',alignItems:'center',padding:5,}}imageStyle={{borderRadius:10}}>
            <Text style={{color:'white',fontSize:14,fontWeight:'bold',fontFamily:'Inter'}}>신규 등록</Text>
          </ImageBackground>
        </TouchableOpacity>
       
        {addModel&&<ApplicantModal visible={addModel} close={closeModal} db={db} len={len}/>}
        {modifyModal&& <ModifyModal db={db} close={closeModify} visible={modifyModal} itemId={selectedItemId} itemName={selectedItemname}/>}
        <Text style={textStyle.infotext}>ID</Text>
        <Text style={{color:'white',
          fontWeight:'bold',
          position: 'absolute',
          fontSize:19,
          top:140,
          left:245,}}>MODEL</Text>
          <Text style={{color:'white',
          fontWeight:'bold',
          position: 'absolute',
          fontSize:19,
          top:140,
          left:355,}}>타입</Text>
           <Text style={{color:'white',
          fontWeight:'bold',
          position: 'absolute',
          fontSize:19,
          top:140,
          left:665,}}>제조자</Text>
          <Text style={{color:'white',
          fontWeight:'bold',
          position: 'absolute',
          fontSize:19,
          top:140,
          left:470,}}>MAC</Text>         
          <Text style={{color:'white',
          fontWeight:'bold',
          position: 'absolute',
          fontSize:19,
          top:140,
          left:1120,}}>관리</Text>
          <Text style={{color:'white',
          fontWeight:'bold',
          position: 'absolute',
          fontSize:19,
          top:140,
          left:850,}}>등록 일시</Text>
          
        <OnAddVehicle/>
        </View>   
      </View>
     
)
}
export default React.memo(T_ECU);
const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    backgroundColor: 'transparent'
  },
  image: {
    width:70,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    bottom:3,
    left:285,
    top:35,
  },
  touchable: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'white',
    fontSize: 18,
    justifyContent:'center',
    textAlign: 'center',
  }
}) 

const textStyle= StyleSheet.create({
    text1:{
        color: 'white',
        fontWeight: 'bold',
        position: 'absolute',
        fontSize: 22,
        left: 70,
        top: 95,
    },
    text2:{
        color: 'white',
        fontWeight: 'bold',
        position: 'absolute',
        fontSize: 22,
        left: 580,
        top: 95,
    },
    text3:{
      color: 'white',
      fontWeight: 'bold',
      position: 'absolute',
      fontSize: 22,
      left: 70,
      top:10,
    },
    text4:{
      color: 'white',
      position: 'absolute',
      fontSize: 18
    },
    text5:{
      color: 'white',
      fontWeight: 'bold',
      position: 'absolute',
      fontSize: 24,
      left:45,
      top:80,
    },
    infotext:{
      color:'white',
      fontWeight:'bold',
      position: 'absolute',
      fontSize:18,
      top:140,
      left:145,
    }
})
