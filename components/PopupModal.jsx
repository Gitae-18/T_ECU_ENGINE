import React, { useState, useCallback, useEffect} from "react";
import { Text, View, Alert, Image , TouchableOpacity, ImageBackground } from "react-native";
import Modal from "react-native-modal";

const PopupModal = ({visible,close,parking,emergency}) => {
    const [text, setText] = useState('');
    const [txtStyle, setTxtStyle] = useState({});
    const notification = {
        oil_temp:"T/A Oil temp too hot",
        oil_pressure:'T/A Oil Pressure too high',
        coolant_temp: 'Coolant too hot',
        parking: 'Parking break is holding !',
        oil_emergency: 'Oil amount is too low',
        battery: 'Battery Low , Charging Battery',
        seat: 'Sitting on the Seat',
        backlight: 'Turn off BackLight',
        emergency: 'Emergency On',
    }
    const park = {
        color:'orange', fontSize:20, left:240, top:90, fontWeight:'bold'
    }
    const emer = {
        color:'orange', fontSize:20, left:290, top:90, fontWeight:'bold'
    }
    const handleText = useCallback(async () => {
        try {
            if (emergency === false) {
              setText(notification.emergency);
              setTxtStyle(emer);
            }
            if (parking === false && emergency === false) {
              setText(notification.parking);
              setTxtStyle(park);
            }
          } catch (error) {
            // 에러 처리
          }
      }, [parking, emergency]);
    
      useEffect(() => {
        handleText();        
      }, [handleText]);    
    return(         
        <View style={{flex:1,}}>
            <Modal  hideModalContentWhileAnimating={true}
            style={{ flex: 1, justifyContent: "center", alignItems: "center", top:320 , }} isVisible={visible} backdropOpacity={0.1}>
                <TouchableOpacity style={{borderWidth:1,borderColor:'transparent',width:50,height:30,top:70,zIndex:100,}} onPress={close}/>
                <ImageBackground  source={require('../assets/images/engine/img_bottom_popup.png')} style={{width:'80%',height:200,left:65,}} resizeMode="stretch">
                    <View>
                        <Text style={txtStyle}>{text}</Text>
                    </View>
                </ImageBackground>                
            </Modal>
        </View>
    )
}

export default PopupModal;