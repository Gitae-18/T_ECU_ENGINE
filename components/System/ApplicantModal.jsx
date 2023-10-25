import React, { useState,useCallback} from "react";
import { Text, View, Alert, Image , TouchableOpacity, ImageBackground ,TextInput} from "react-native";
import Modal from "react-native-modal";
import moment from "moment/moment";
import {collection, addDoc , getDocs, serverTimestamp, setDoc, doc} from "@react-native-firebase/firestore";

const ApplicantModal = ({visible,close,db,len}) => {
    const [vehicle, setVehicle] = useState({
        id:'',
        mac:'',
        type:'',
        model:'',
    });
    const {id,mac,type,model} = vehicle;
    const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const usersCollectionRef = collection(db,'users');
    const notification = {
        oil_temp:"T/A Oil temp too hot",
        oil_pressure:'T/A Oil Pressure too high',
    }
    const AddDevice = useCallback(async() => {
        try{
          const res = await addDoc(usersCollectionRef,{
            MAC:mac,
            created:nowTime,
            model:model,
            name:id,
            productor:'infini',
            type:type,
          })
          console.log(res);
          console.log("Document has been added successfully");
        }
        catch(error){
          console.log(error);
        }
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
                        <TextInput style={{width:100, backgroundColor:'#2f2825',height:35,top:55,left:40, borderWidth:1,borderColor:'#1f1f1f', color:'white',borderRadius:5,}} value={id} onChangeText={text => setVehicle({...vehicle, id:text})}  editable multiline maxLength={30} />
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
                        <TextInput style={{width:200, backgroundColor:'#2f2825',height:35,top:55,left:40, borderWidth:1,borderColor:'#1f1f1f', color:'white',borderRadius:5,}} value={mac} onChangeText={text => setVehicle({...vehicle, mac:text})}  editable multiline maxLength={30} />
                    </View>
                    </View>                
                </ImageBackground>         
                <View>
                        <TouchableOpacity style={{borderWidth:1,borderColor:'transparent',bottom:70,}} onPress={AddDevice}>
                            <ImageBackground source={require('../../assets/images/engine/defaultbtn.png')} style={{width:80,height:50,}} resizeMode="stretch">
                                <Text style={{fontSize:14,color:'white',left:27,top:15}}>저장</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>       
            </Modal>
        </View>
    )
}

export default ApplicantModal;