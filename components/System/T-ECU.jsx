import React, {useState, /* useRef, useEffect, useCallback */} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  //Pressable,
  TouchableOpacity,
  //Animated,
  SafeAreaView,
  //Button,
  //ScrollView,
  //TouchableWithoutFeedback,
  //FlatList
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
const T_ECU = () =>{
    const [pickerValue, setPickerValue] = useState("등록된 T-ECU ID");

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('등록된 T-ECU ID');
    const [items, setItems] = useState([
        {label: '등록된 T-ECU ID', value: '0'},
        {label: 'aaa', value: 'a'},
        {label: 'bbb', value: 'b'}
        ]);
return(
 
    <View style={{flex:1,height:1400}}>
 
     <Text style={textStyle.text1}>· T-ECU 연결관리</Text>
      
     <SafeAreaView>
      <DropDownPicker style={{backgroundColor:'#161413',width:160,left:220,top:50,color:'white'}} placeholderStyle={{
        color: "white",
        fontWeight: "bold"
      }}
        defaultValue={value}
        arrowIconStyle={{marginRight:5,tintColor:'white'}}
        placeholder="등록된 T-ECU ID"
        labelStyle={{color: 'white'}}
        open={open} items={items} value={value} setOpen={setOpen} setValue={setValue} setItems={setItems} dropDownDirection="BOTTOM"dropDownContainerStyle={{
        backgroundColor: "#dfdfdf",width:160,left:220,top:100,
        }}/>
     </SafeAreaView>
      <Text style={textStyle.text2}>·MAC Address</Text>
      <ImageBackground source={require('../../assets/images/engine/bg_table.png')} style={{width:220,height:50,left:550}} imageStyle={{borderRadius:10}}>
        <View style={{justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontSize:20,color:"#fff",fontWeight:'bold',top:10,}}>AA:BB:CC:DD:11:22</Text>
        </View>
      </ImageBackground>
      <View style={{flexDirection: 'row', bottom:5}}>
      <TouchableOpacity  style={{height:40,left:770,bottom:40,}}>
          <View style={{justifyContent:'center',alignItems:'center'}}>
            <ImageBackground source={require('../../assets/images/engine/basic_btn.png')} style={styles.image}>
            <Text style={styles.text}>연결</Text>
            </ImageBackground>
          </View>         
      </TouchableOpacity>
      <TouchableOpacity  style={{height:40,left:775,bottom:40,}}>
          <View style={{justifyContent:'center',alignItems:'center'}}>
            <ImageBackground source={require('../../assets/images/engine/basic_btn.png')} style={styles.image}>
            <Text style={styles.text}>끊기</Text>
            </ImageBackground>
          </View>         
      </TouchableOpacity>
      </View>
      <Text style={textStyle.text3}>· 접속 Log 정보</Text>    
        <ImageBackground source={require('../../assets/images/engine/bg_table_off.png')} style={{width:800,height:300,left:70,top:20,position:'relative'}} imageStyle={{borderRadius:10}}>
          <Text  style={textStyle.text4}>
            [22-05-17 01:10:11:33] Attempt to AA:BB:CC:DD:11:22 Connecting........{'\n'}
            [22-05-17 01:10:11:38] Success Connected 211.246.74.11{'\n'}
            [22-05-17 01:10:11:42] Recieved T-ECU data .......{'\n'}
            [22-05-17 01:10:11:46] Recieved T-ECU data .......{'\n'}
            [22-05-17 01:10:11:46] Recieved T-ECU data .......{'\n'}
            [22-05-17 01:10:11:46] Recieved T-ECU data .......{'\n'}
            [22-05-17 01:10:11:46] Recieved T-ECU data .......{'\n'}
            [22-05-17 01:10:11:46] Recieved T-ECU data .......{'\n'}
            [22-05-17 01:10:11:46] Recieved T-ECU data .......{'\n'}
            [22-05-17 01:10:11:46] Recieved T-ECU data .......{'\n'}
            [22-05-17 01:10:11:46] Recieved T-ECU data .......{'\n'}
            [22-05-17 01:10:11:46] Recieved T-ECU data .......{'\n'}
            [22-05-17 01:10:11:46] End Received T-ECU data .......{'\n'}
            [22-05-17 01:10:11:46] End Preprocessing .......{'\n'}

          </Text>
        </ImageBackground>   
        <View style={{flex:1,width:500,top:50}}>
                      <Image source={require('../../assets/images/engine/img_divider_line.png')} style={{width:1200,bottom:0}}></Image>
        </View>
        <View style={{flex:1,heigth:1000}}>
        <Text style={textStyle.text5}>· 차량 등록 정보</Text>
        <TouchableOpacity>
          <ImageBackground source={require('../../assets/images/engine/basic_btn.png')} style={{width:120,height:60,top:70,left:830,justifyContent:'center',alignItems:'center',padding:5,}}imageStyle={{borderRadius:10}}>
            <Text style={{color:'white',fontSize:14,fontWeight:'bold',fontFamily:'Inter',}}>신규 등록</Text>
          </ImageBackground>
        </TouchableOpacity>
        <Text style={textStyle.infotext}>ID</Text>
        <Text style={{color:'white',
          fontWeight:'bold',
          position: 'absolute',
          fontSize:18,
          top:140,
          left:140,}}>MODEL</Text>
          <Text style={{color:'white',
          fontWeight:'bold',
          position: 'absolute',
          fontSize:18,
          top:140,
          left:280,}}>타입</Text>
          <Text style={{color:'white',
          fontWeight:'bold',
          position: 'absolute',
          fontSize:18,
          top:140,
          left:400,}}>MAC</Text>
          <Text style={{color:'white',
          fontWeight:'bold',
          position: 'absolute',
          fontSize:18,
          top:140,
          left:520,}}>제조자</Text>
          <Text style={{color:'white',
          fontWeight:'bold',
          position: 'absolute',
          fontSize:18,
          top:140,
          left:640,}}>등록 일시</Text>
          <Text style={{color:'white',
          fontWeight:'bold',
          position: 'absolute',
          fontSize:18,
          top:140,
          left:800,}}>관리</Text>
          <View style={{flex:1,top:170,flexDirection:'row'}}>
           <ImageBackground source={require('../../assets/images/engine/bg_table_off.png')} style={{width:900,height:500,left:50}} imageStyle={{borderRadius:20}}>
            <ImageBackground source={require('../../assets/images/engine/img_table_box_outer.png')} style={{width:700,height:40,top:30,justifyContent:'center',alignItems:'baseline'}}>
              <Text style={{color:'white',fontSize:16}}>AAA012</Text>
            </ImageBackground>
            <TouchableOpacity style={{left:700,bottom:15}}>
              <ImageBackground source={require('../../assets/images/engine/img_table_box_btn.png')} style={{width:100,height:50,justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'white',fontSize:18}}>수정</Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity style={{left:800,bottom:65}}>
              <ImageBackground source={require('../../assets/images/engine/img_table_box_btn.png')} style={{width:100,height:50,justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'white',fontSize:18}}>삭제</Text>
              </ImageBackground>
            </TouchableOpacity>
          </ImageBackground>
          </View>
        </View>   

      </View>
     
)
}
const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    backgroundColor: 'transparent'
  },
  image: {
    width:70,
    height:50,
  },
  touchable: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'white',
    fontSize: 18,
    top:10,
    textAlign: 'center'
  }
})
const textStyle= StyleSheet.create({
    text1:{
        color: 'white',
        fontWeight: 'bold',
        position: 'absolute',
        fontSize: 20,
        left: 60,
        top: 60,
    },
    text2:{
        color: 'white',
        fontWeight: 'bold',
        position: 'absolute',
        fontSize: 20,
        left: 400,
        top: 60,
    },
    text3:{
      color: 'white',
      fontWeight: 'bold',
      position: 'absolute',
      fontSize: 20,
      left: 60,
      top: 120,
    },
    text4:{
      color: 'white',
      position: 'absolute',
      fontSize: 18,
    },
    text5:{
      color: 'white',
      fontWeight: 'bold',
      position: 'absolute',
      fontSize: 20,
      left:30,
      top:80,
    },
    infotext:{
      color:'white',
      fontWeight:'bold',
      position: 'absolute',
      fontSize:18,
      top:140,
      left:60,
    }
})
export default T_ECU;