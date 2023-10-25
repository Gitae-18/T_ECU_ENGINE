import React, { useState } from "react";
import { Text, View, Alert, Image , TouchableOpacity, ImageBackground } from "react-native";
import Modal from "react-native-modal";

const PopupModal = ({visible,close}) => {
    const notification = {
        oil_temp:"T/A Oil temp too hot",
        oil_pressure:'T/A Oil Pressure too high',
    }

    return(         
        <View style={{flex:1,}}>
            <Modal  hideModalContentWhileAnimating={true}
            style={{ flex: 1, justifyContent: "center", alignItems: "center", top:200 , }} isVisible={visible} backdropOpacity={0.1}>
                <TouchableOpacity style={{borderWidth:1,borderColor:'transparent',width:50,height:30,top:70,zIndex:100,}} onPress={close}/>
                <ImageBackground  source={require('../assets/images/engine/img_bottom_popup.png')} style={{width:'80%',height:200,left:65,}} resizeMode="stretch">
                    <View>
                        <Text style={{color:'orange', fontSize:20, left:180, top:90, fontWeight:'bold'}}>T/A Oil temp too hot.</Text>
                    </View>
                </ImageBackground>                
            </Modal>
        </View>
    )
}

export default PopupModal;