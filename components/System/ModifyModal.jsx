import React, { useState, useCallback, useEffect} from "react";
import { Text, View, Alert, Image , TouchableOpacity, ImageBackground ,TextInput} from "react-native";
import Modal from "react-native-modal";
import moment from "moment/moment";
import {collection, addDoc , getDocs, serverTimestamp, setDoc, doc, updateDoc, getFirestore, query, where} from "@react-native-firebase/firestore";
const db = getFirestore();
const ModifyModal = ({visible,close,itemId,itemName}) => {
    const [device, setDevice] = useState([]);
    const [vehicle, setVehicle] = useState({
        name:'',
        MAC:'',
        type:'',
        model:'',
        productor:'',
        created:'',
    });
    const {name,MAC,type,model,productor,} = vehicle;
    const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const usersCollectionRef = collection(db,'users');
    const notification = {
        oil_temp:"T/A Oil temp too hot",
        oil_pressure:'T/A Oil Pressure too high',
    }
    const fetchData = useCallback(async() => {
        try {
            const q = query(collection(db, 'users').where('name', '==', itemName));
            const querySnapShot = await getDocs(q);
            const data = querySnapShot.docs.map(doc => ({
                name: doc.data().name,
                model: doc.data().model,
                type: doc.data().type,
                MAC: doc.data().MAC,
                productor: doc.data().productor,
                created: doc.data().created,
              }));
              if (data.length > 0) {
                setVehicle(data[0]);
              } else {
                console.log('해당 데이터가 없습니다.');
              }
            
        } catch (error) {
            console.error("데이터 불러오기 오류:", error);
        }   
     },[itemId]);
    useEffect(()=>{
      fetchData();
    },[fetchData])
  
    const UpdateDevice = useCallback(async() => {
       const uid = itemId;
       const userRef = await updateDoc(doc(db, 'users', uid),{
            MAC:MAC,
            model:model,
            name:name,
            productor:productor,
            type:type,
       });
    },[vehicle])
    return(         
        <View style={{flex:1,}}>
            <Modal  hideModalContentWhileAnimating={true}
            style={{ flex: 1, justifyContent: "center", alignItems: "center",}} isVisible={visible} backdropOpacity={0.1}>
               
                <TouchableOpacity style={{borderWidth:1,borderColor:'transparent',width:50,height:30,top:40,zIndex:100,}} onPress={close}/>
                
                <ImageBackground  source={require('../../assets/images/engine/img_slide.png')} style={{width:700,height:350,left:15,}} resizeMode="stretch">
                    <Image  source={require('../../assets/images/engine/icon_triangle_down.png')} resizeMode="stretch"style={{position:'absolute', left:290,top:-20,}}/>
                    <View>
                    <View style={{flexDirection:'row',height:60}}>                        
                        <Text style={{color:'white', fontSize:20,left:20,top:55,fontWeight:'bold'}}>ID.</Text>
                        <TextInput style={{width:100, backgroundColor:'#2f2825',height:35,top:55,left:40, borderWidth:1,borderColor:'#1f1f1f', color:'white',borderRadius:5,}} value={name} onChangeText={text => setVehicle(prevVehicle => ({ ...prevVehicle, name: text }))}  editable multiline maxLength={30} />
                    </View>
                    <View style={{flexDirection:'row',height:60}}>                        
                        <Text style={{color:'white', fontSize:20,left:20,top:55,fontWeight:'bold'}}>Model.</Text>
                        <TextInput style={{width:180, backgroundColor:'#2f2825',height:35,top:55,left:40, borderWidth:1,borderColor:'#1f1f1f', color:'white',borderRadius:5,}} value={model} onChangeText={text => setVehicle({...vehicle, model:text})}  editable multiline maxLength={30} />
                    </View>
                    <View style={{flexDirection:'row',height:60}}>                        
                        <Text style={{color:'white', fontSize:20,left:20,top:55,fontWeight:'bold'}}>Type.</Text>
                        <TextInput style={{width:100, backgroundColor:'#2f2825',height:35,top:55,left:40, borderWidth:1,borderColor:'#1f1f1f', color:'white',borderRadius:5,}} value={type} onChangeText={text => setVehicle({...vehicle, type:text})}  editable multiline maxLength={30} />
                    </View>
                    <View style={{flexDirection:'row',height:60}}>                        
                        <Text style={{color:'white', fontSize:20,left:20,top:55,fontWeight:'bold'}}>MAC.</Text>
                        <TextInput style={{width:200, backgroundColor:'#2f2825',height:35,top:55,left:40, borderWidth:1,borderColor:'#1f1f1f', color:'white',borderRadius:5,}} value={MAC} onChangeText={text => setVehicle({...vehicle, MAC:text})}  editable multiline maxLength={30} />
                    </View>
                    <View style={{flexDirection:'row',height:60}}>                        
                        <Text style={{color:'white', fontSize:20,left:20,top:55,fontWeight:'bold'}}>Productor</Text>
                        <TextInput style={{width:200, backgroundColor:'#2f2825',height:35,top:55,left:40, borderWidth:1,borderColor:'#1f1f1f', color:'white',borderRadius:5,}} value={productor} onChangeText={text => setVehicle({...vehicle, productor:text})}  editable multiline maxLength={30} />
                    </View>
                    </View>                
                </ImageBackground>         
                <View>
                        <TouchableOpacity style={{borderWidth:1,borderColor:'transparent',bottom:0,}} onPress={UpdateDevice}>
                            <ImageBackground source={require('../../assets/images/engine/defaultbtn.png')} style={{width:80,height:50,}} resizeMode="stretch">
                                <Text style={{fontSize:14,color:'white',left:27,top:15}}>저장</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>       
            </Modal>
        </View>
    )
}

export default ModifyModal;