import React, { useState } from "react";
import { Text, View, Alert, Image , TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

const PopupModal = ({visible,close}) => {
    return(
        <View style={{flex:1,}}>
            <Modal  hideModalContentWhileAnimating={true}
            style={{ flex: 1, justifyContent: "center", alignItems: "center", top:200 , }} isVisible={visible} backdropOpacity={0.1}>
                <TouchableOpacity style={{borderWidth:1,borderColor:'transparent',width:50,height:30,top:70,zIndex:100,}} onPress={close}/>
                <Image  source={require('../assets/images/engine/img_bottom_popup.png')} style={{width:'50%',height:200,}} resizeMode="stretch"/>                
            </Modal>
        </View>
    )
}

export default PopupModal;