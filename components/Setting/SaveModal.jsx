import React, { useState } from "react";
import { Text, View, Alert, Image , TouchableOpacity, ImageBackground ,TextInput} from "react-native";
import Modal from "react-native-modal";

const SaveModal = ({visible, close}) => {
    return(
        <View style={{flex:1}}>
            <Modal  hideModalContentWhileAnimating={true}
            style={{ flex: 1, justifyContent: "center", alignItems: "center",}} isVisible={visible} backdropOpacity={0.1}>
                <ImageBackground source={require('../../assets/images/engine/img_center_popup_text.png')} style={{width:700,height:300,left:10,justifyContent:'center'}} resizeMode="stretch">
                    <View>
                    <Text style={{textAlign:'center',color:'white',fontSize:20,fontWeight:'bold'}}>저장 완료 되었습니다.</Text>
                    </View>
                </ImageBackground>
                <TouchableOpacity style={{borderWidth:1, borderColor:'transparent', width:100,height:30,bottom:90,left:10,}} onPress={close}/>
            </Modal>
        </View>
    )
}
export default React.memo(SaveModal);