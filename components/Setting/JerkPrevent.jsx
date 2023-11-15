import React, {useState, useEffect, useCallback, /* useRef, useEffect, useCallback */} from 'react';
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
  LogBox,
  //Button,
  //ScrollView,
  //TouchableWithoutFeedback,
  //FlatList
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {VictoryLine, VictoryChart, VictoryTheme, VictoryAxis} from 'victory-native';
import SaveModal from './SaveModal';
import {initializeApp,firebase} from '@react-native-firebase/app';
import {collection, addDoc , getDocs, serverTimestamp, deleteDoc, doc, getFirestore, query, updateDoc, orderBy} from "@react-native-firebase/firestore";
if(!firebase.apps.length){
  initializeApp();
}
const db = getFirestore();
const JerkPrevent = () =>{
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [gear, setGear] = useState([ 
    {label: 'Default', value:'default'},
    {label: 'Forward Valve', value:'Forward'},
    {label: 'Reverse Valve', value: 'Reverse'},
    {label: 'Parking Valve', value: 'parking'},]);
    const [saveModal, setSaveModal] = useState(false);
    const [value, setValue] = useState('');
    const [value2, setValue2] = useState('');
    const [profile,setProfile] = useState([]);
    const [list,setList] = useState([]);
    const [currentId,setCurrentId] = useState();
    const [graph,setGraph] = useState(false);
    const [items, setItems] = useState([]);
    const [items2, setItems2] = useState([]);
    const [profile2, setProfile2] = useState([]);
    
    const handleProfile = useCallback(async()=>{
        const getProfileRef = query(collection(db,'profiles'));
        const listSnap = await getDocs(getProfileRef);
        const data = listSnap.docs.map(doc=>({
          id:doc.id,
          value:doc.data(),
        }));
        
        const updatedItems = data.map((item) => ({
          label : item.id,
          value : item.id,
          id : item.value,
        }))
        setItems(updatedItems);
        listSnap.forEach(async(doc) => {
          const parentDocId = doc.id;
          const subCollectionRef = collection(db, 'profiles', parentDocId, 'ID1'); // 하위 컬렉션에 대한 참조
          // subCollectionRef를 사용하여 하위 컬렉션 내의 문서 ID를 조회하거나 다른 작업을 수행할 수 있습니다.
          // 예를 들어, 하위 컬렉션 내의 문서 ID를 가져오려면 다음과 같이 할 수 있습니다.
          const subCollectionSnap = await getDocs(subCollectionRef);
          subCollectionSnap.forEach((subDoc) => {
            const subDocId = subDoc.id;
            console.log(`하위 컬렉션 ${parentDocId} 내의 문서 ID: ${subDocId}`);
          });
        })
    },[])
    console.log(value);
    const parentCollection = 'profiles';
    const parentDocId = "profile1";
    const subCollection = "ID1";
    const newData = {
      End:profile.End,
      Start:profile.Start,
      Time:profile.Time,
    }
    const updateProfile = useCallback(async() => {
      /* const parentDocRef = doc(db, parentCollection, parentDocId);
      const subCollectionRef = doc(parentDocRef,subCollection);
      const querySnapShot = await getDocs(subCollectionRef);
      querySnapShot.forEach(async(subDoc) => {
        const subDocRef = doc(subCollectionRef, subDoc.id);
        try{
          await updateDoc(subDocRef,newData);
          console.log(`하위 문서 ${subDoc.id}가 업데이트 되었습니다.`);
        }
        catch(error){
          console.error(error);
        }
      }) */
      profile.forEach(async(item,index) => {
        const userRef = doc(db, 'profiles', value, value2, item.id);
        try {
          await updateDoc(userRef, {
            End: profile[index].End,
            Start: profile[index].Start,
            Time: profile[index].Time,
          });
          console.log('문서가 업데이트되었습니다.');
        } catch (error) {
          console.error('문서 업데이트 오류:', error);
        }
      })
     
    },[profile,value,value2])
    const getProfiles = useCallback(async() => {
      try{
      const profileRef = query(collection(db,`profiles/${value}/${value2}`),orderBy('num','asc'));
      const profileSnap = await getDocs(profileRef);
     
      const data  = profileSnap.docs.map(doc => ({
        id: doc.id,
        num: doc.data().num,
        Start: doc.data().Start,
        End: doc.data().End,
        Time: doc.data().Time,
      }));
      console.log(data);
      const filteredData = data.filter(item => item.num <= 10);
      const filteredData2 = data.filter(item => item.num > 10);
      setCurrentId(profileSnap.docs.map(doc=>({id:doc.id})));
      setProfile(filteredData);
      setProfile2(filteredData2);
      }
      catch(e){
        console.log(e);
      }
    },[db,value,gear,value2])
    useEffect(()=>{
      handleProfile();
    },[getProfiles])
    const closeModal = () => {
        setSaveModal(false);
    }
    const handleChangeGraph = (e)=> {
        setGraph(!graph);
    }
    const onPlusStart = (itemId) => {
        setProfile((prevItems) =>
          prevItems.map((item) =>
            item.id === itemId ? { ...item, Start: item.Start + 1 } : item
          )
        );
        setProfile2((prevItems) =>
          prevItems.map((item) =>
            item.id === itemId ? { ...item, Start: item.Start + 1 } : item
          )
        );
      };
      
      const onMinusStart = (itemId) => {
        setProfile((prevItems) =>
          prevItems.map((item) =>
            item.id === itemId ? { ...item, Start: item.Start - 1 } : item
          )
        );
        setProfile2((prevItems) =>
          prevItems.map((item) =>
            item.id === itemId ? { ...item, Start: item.Start - 1 } : item
          )
        );
      };
      
      const onPlusEnd = (itemId) => {
        setProfile((prevItems) =>
          prevItems.map((item) =>
            item.id === itemId ? { ...item, End: item.End + 1 } : item
          )
        );
        setProfile2((prevItems) =>
          prevItems.map((item) =>
            item.id === itemId ? { ...item, End: item.End + 1 } : item
          )
        );
      };
      
      const onMinusEnd = (itemId) => {
        setProfile((prevItems) =>
          prevItems.map((item) =>
            item.id === itemId ? { ...item, End: item.End - 1 } : item
          )
        );
        setProfile2((prevItems) =>
          prevItems.map((item) =>
            item.id === itemId ? { ...item, End: item.End - 1 } : item
          )
        );
      };
      const onTimePlus = (itemId) => {
        setProfile((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, Time: item.Time + 1 } : item
        )
      );
      setProfile2((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, Time: item.Time + 1 } : item
        )
      );
      }
      const onTimeMinus = (itemId) => {
        setProfile((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, Time: item.Time - 1 } : item
        )
      );
      setProfile2((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, Time: item.Time - 1 } : item
      )
    );
      }
      useEffect(()=>{
        LogBox.ignoreLogs(['Require cycle'])
      },[])
    return(
        <View style={{flex:1,height:1200}}>
            <View style={{flex:1, top:40, borderWidth:1,borderColor:"transparent"}}>
            <Text style={textStyle.text1}>· 프로파일 편집</Text>
            <SafeAreaView>
            <DropDownPicker style={{backgroundColor:'#161413',left:220,top:80,color:'white',textAlign:'center',minHeight: 40,
                }} placeholderStyle={{
                color: "white",
                fontWeight: "bold",
                textAlign:'center',
                fontSize:16,
                }}
                containerStyle={{width:160,}}                
                arrowIconStyle={{marginRight:5,tintColor:'white'}}
                labelStyle={{fontSize:18,fontWeight:'bold',color: 'white',paddingLeft:8,}}
                showArrow={true}
                onChangeItem={(item)=> {
                    setItems({
                        item: item.value
                    });
                }}        
                defaultValue="item1"
                defaultIndex={1}
                placeholder="Select Item"
                open={open} items={items} value={value} setOpen={setOpen} setValue={setValue} setItems={setItems} dropDownDirection="BOTTOM"dropDownContainerStyle={{
                backgroundColor: "#dfdfdf",width:160,left:220,top:120,
                }}/>
                  <DropDownPicker style={{backgroundColor:'#161413', width:200, left:520,top:38,color:'white',textAlign:'center',minHeight: 40,
                }} placeholderStyle={{
                color: "white",
                fontWeight: "bold",
                textAlign:'center',
                fontSize:16,
                }}
                containerStyle={{width:200, }}                
                arrowIconStyle={{marginRight:5,tintColor:'white'}}
                labelStyle={{fontSize:18,fontWeight:'bold',color: 'white',paddingLeft:8,}}
                showArrow={true}
                onChangeItem={(item)=> {
                    setItems({
                        item: item.value
                    });
                }}        
                defaultValue="item1"
                defaultIndex={1}
                placeholder="Select Item"
                open={open2} items={gear} value={value2} setOpen={setOpen2} setValue={setValue2} setItems={setGear} dropDownDirection="BOTTOM"dropDownContainerStyle={{
                backgroundColor: "#dfdfdf",width:200,left:520,top:80,
                }}/>
                <TouchableOpacity
                style={{width:200,left:340,bottom:3}} onPress={getProfiles}>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                <ImageBackground source={require('../../assets/images/engine/basic_btn.png')} style={{width:120,height:45}}>
                <Text style={textStyle.load}>불러오기</Text>
                </ImageBackground>
                </View>   
                </TouchableOpacity>
                {/* 프로파일 */}
                <View style={{flex:1,flexDirection:'row',position:'absolute',left:660,top:35}}>
                <TouchableOpacity
                style={{left:130,flex:1,borderColor:'transparent',width:200,position:'absolute',top:30}} onPress={updateProfile}>                
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ImageBackground source={require('../../assets/images/engine/basicBtn.png')} style={{width:200,height:60}} resizeMode='stretch' imageStyle={{borderRadius:50,borderWidth:10,}}>
                <Text style={textStyle.save}>프로파일 저장</Text>
                </ImageBackground>
                </View>   
                </TouchableOpacity>
                <TouchableOpacity
                style={{flex:1,width:200,width:200,position:'absolute',left:305,top:30, marginLeft:20,}}
                onPress={handleChangeGraph}>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                <ImageBackground source={require('../../assets/images/engine/basicBtn.png')} style={{width:200,height:60}}resizeMode='stretch' imageStyle={{borderRadius:10}}>
                {graph===true?<Text style={textStyle.edit}>편집 모드 가기</Text>:<Text style={textStyle.edit2}>그래프 형태 보기</Text>}
                </ImageBackground>
                </View>   
                </TouchableOpacity>
                </View>
                {saveModal&& <SaveModal visible={saveModal} close={closeModal}/>}
                {/* 프로파일 */}
                {graph===true?
                <>
                <View>
                <ImageBackground source={require('../../assets/images/engine/Rectangle.png')} style={{width:1120,height:430,left:60,top:20,position:'relative'}} imageStyle={{borderRadius:10}}>
                    <VictoryChart width={1130} height={420} domainPadding={{ x: 10 , y:10 }} padding={50}>
                        <VictoryLine  
                         style={{
                            data: { stroke: "#FF1717",strokeWidth:5, },
                            parent: { border: "1px solid #ccc"},
                            labels: {
                                fontSize: 15,
                                fill: ({ datum }) => datum.x === 3 ? "#000000" : "#c43a31"
                              }
                          }}
                        animate={{duration:1000,onLoad:{duration:500}}}
                        data={[
                        { x: 0.1, y: 200 },
                        { x: 0.2, y: 250 },
                        { x: 0.3, y: 300 },
                        { x: 0.4, y: 400 },
                        { x: 0.5, y: 300 },
                        { x: 0.6, y: 450 },
                        { x: 0.7, y: 600 },
                        { x: 0.8, y: 700 },
                        { x: 0.9, y: 750 },
                        { x: 1.0, y: 780 },
                        { x: 1.1, y: 820 },
                        { x: 1.2, y: 850 },
                        { x: 1.3, y: 900 },
                        { x: 1.4, y: 900 },
                        { x: 1.5, y: 900 },
                        { x: 1.6, y: 900 },
                        { x: 1.7, y: 900 },
                        { x: 1.8, y: 900 },
                        { x: 1.9, y: 900 },
                        { x: 2.0, y: 900 },
                        ]}/>
                        <VictoryLine  
                         style={{
                            data: { stroke: "#28DBF3",strokeWidth:5, },
                            parent: { border: "1px solid #ccc"},
                            labels: {
                                fontSize: 15,
                                fill: ({ datum }) => datum.x === 3 ? "#000000" : "#313f4f"
                              }
                          }}
                          animate={{duration:1000,onLoad:{duration:500}}}
                        data={[
                        { x: 0.1, y: 500 },
                        { x: 0.2, y: 600 },
                        { x: 0.3, y: 500 },
                        { x: 0.4, y: 200 },
                        { x: 0.5, y: 350 },
                        { x: 0.6, y: 500 },
                        { x: 0.7, y: 500 },
                        { x: 0.8, y: 520 },
                        { x: 0.9, y: 520 },
                        { x: 1.0, y: 530 },
                        { x: 1.1, y: 560 },
                        { x: 1.2, y: 580 },
                        { x: 1.3, y: 590 },
                        { x: 1.4, y: 600 },
                        { x: 1.5, y: 620 },
                        { x: 1.6, y: 700 },
                        { x: 1.7, y: 770 },
                        { x: 1.8, y: 820 },
                        { x: 1.9, y: 950 },
                        { x: 2.0, y: 800 },
                        ]}/>
                        <VictoryLine  
                         style={{
                            data: { stroke: "#E5FF44",strokeWidth:5, },
                            parent: { border: "1px solid #ccc"},
                            labels: {
                                fontSize: 12,
                                fill: ({ datum }) => datum.x === 3 ? "#000000" : "#313f4f"
                              }
                          }}
                          animate={{duration:1000,onLoad:{duration:500}}}
                          
                        data={[
                        { x: 0.1, y: 1100 },
                        { x: 0.2, y: 300 },
                        { x: 0.3, y: 400 },
                        { x: 0.4, y: 600 },
                        { x: 0.5, y: 350 },
                        { x: 0.6, y: 760 },
                        { x: 0.7, y: 500 },
                        { x: 0.8, y: 650 },
                        { x: 0.9, y: 620 },
                        { x: 1.0, y: 800 },
                        { x: 1.1, y: 840 },
                        { x: 1.2, y: 260 },
                        { x: 1.3, y: 460 },
                        { x: 1.4, y: 380 },
                        { x: 1.5, y: 950 },
                        { x: 1.6, y: 1000 },
                        { x: 1.7, y: 1200 },
                        { x: 1.8, y: 500 },
                        { x: 1.9, y: 700 },
                        { x: 2.0, y: 1000 },
                        ]}/>
                         <VictoryAxis label="Current(mA)"
            dependentAxis offsetX={70}
            crossAxis={true}
            style={{axis:{stroke:'transparent',axisLabel:{fontSzie:20,fill:'#848792'}
            },
            ticks:{stroke:'transparent',size:5,},tickLabels:{fontSize:15,padding:15,fill:'#848792'},
            grid: { stroke: "#848792", strokeDasharray: "1", strokeWidth: 1 ,opacity:"1"},
            axisLabel:{fontSize: 15,padding:50,fill:'#848792'}
            }}
            standalone={true}
            />
            <VictoryAxis label="Time(sec)"
            offsetY={70}
            style={{axis:{stroke:'transparent',axisLabel:{fontSzie:15,fill:'#848792'}},
            ticks:{stroke:'transparent',size:5,},tickLabels:{fontSize:15,padding:5,fill:'#848792'},
            grid: { stroke: "#848792", strokeDasharray: "1", strokeWidth: 1 ,opacity:"1"},    
            axisLabel:{fontSize: 15,fill:'#848792',padding:30,} 
            }} domain={{x:[0.1,2]}} tickValues={[0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.0,1.1,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9,2.0]}
            />
                    </VictoryChart>
                </ImageBackground>
                </View>
                </>
                :
                <>
                <View style={{flex:1,top:20}}>
                    {/* Column 명 */}
                    <Text style={{color: 'white', fontWeight: '600',position: 'absolute',fontSize:14,left:80,}}>No</Text>
                    <Image source={require('../../assets/images/engine/img_table_divider.png')} style={{left:120 ,height:20,position:'absolute'}} resizeMode="stretch"/>
                    <Text style={{color: 'white', fontWeight: '600',position: 'absolute',fontSize:14,left:150,}}>Start (mA)</Text>
                    <Image source={require('../../assets/images/engine/img_table_divider.png')} style={{left:235 ,height:20,position:'absolute'}} resizeMode="stretch"/>
                    <Text style={{color: 'white', fontWeight: '600',position: 'absolute',fontSize:14,left:265,}}>End (mA)</Text>
                    <Image source={require('../../assets/images/engine/img_table_divider.png')} style={{left:345 ,height:20,position:'absolute'}} resizeMode="stretch"/>
                    <Text style={{color: 'white', fontWeight: '600',position: 'absolute',fontSize:14,left:370,}}>Time(m/s)</Text>

                    <Text style={{color: 'white', fontWeight: '600',position: 'absolute',fontSize:14,left:510,}}>No</Text>
                    <Image source={require('../../assets/images/engine/img_table_divider.png')} style={{left:555 ,height:20,position:'absolute'}} resizeMode="stretch"/>
                    <Text style={{color: 'white', fontWeight: '600',position: 'absolute',fontSize:14,left:585,}}>Start (mA)</Text>
                    <Image source={require('../../assets/images/engine/img_table_divider.png')} style={{left:680 ,height:20,position:'absolute'}} resizeMode="stretch"/>
                    <Text style={{color: 'white', fontWeight: '600',position: 'absolute',fontSize:14,left:710,}}>End (mA)</Text>
                    <Image source={require('../../assets/images/engine/img_table_divider.png')} style={{left:795 ,height:20,position:'absolute'}} resizeMode="stretch"/>
                    <Text style={{color: 'white', fontWeight: '600',position: 'absolute',fontSize:14,left:815,}}>Time(m/s)</Text>                    
                </View>
                <View style={{flex:1,flexDirection:'row'}}>
                    {/*  Control Table */}
                    <ImageBackground source={require('../../assets/images/engine/bg_table_off.png')} style={{width:550,height:400,left:60,top:60,position:'relative'}} imageStyle={{borderRadius:10}}>
                        <View style={{flex:1,borderWidth:1,borderColor:'transparent',right:5,padding:0}}>
                        {/* 1행 */}
                        {profile.map((item,index)=> (
                        <View  style={{flexDirection:'row',bottom:5,height:35,marginTop:3,}} key={item.id}>
                        <ImageBackground source={require('../../assets/images/engine/img_table_num_bg.png')} style={{width:65,height:35,left:15,alignItems:'center',justifyContent:'center',marginTop:10,}} resizeMode='stretch' imageStyle={{borderRadius:5}}>
                            <Text style={{color:'white',fontSize:14,textAlign:'center'}}>{item.num}</Text>
                        </ImageBackground>
                        <ImageBackground source={require('../../assets/images/engine/img_table_box_inner.png')} style={{width:65,height:35,left:25,alignItems:'center',justifyContent:'center',marginTop:10,}} resizeMode='stretch' imageStyle={{borderRadius:5}}>
                            <Text style={{color:'white',fontWeight:'600',fontSize:14,textAlign:'center'}}>{item.Start}</Text>
                        </ImageBackground>
                        <TouchableOpacity style={{left:20,top:5,borderWidth:1,borderColor:'transparent',width:40,}}
                        onPress={()=>onPlusStart(item.id)}
                        >
                            <ImageBackground source={require('../../assets/images/engine/basic_btn.png')} style={{width:40,height:45,left:10,}} resizeMode='stretch'>
                                <Image source={require('../../assets/images/engine/icon_triangle_down.png')} style={{width:25,height:25,top:10,left:8,transform: [{ rotate: '180 deg' }],}} resizeMode='stretch'/>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginLeft:15,top:5,borderWidth:1,borderColor:'transparent',width:40}}
                        onPress={()=>onMinusStart(item.id)}>
                            <ImageBackground source={require('../../assets/images/engine/basic_btn.png')} style={{width:40,height:45,left:10,}} resizeMode='stretch'>
                                <Image source={require('../../assets/images/engine/icon_triangle_down.png')} style={{width:25,height:25,top:10,left:7,}} resizeMode='stretch'/>                            
                            </ImageBackground>
                        </TouchableOpacity>
                        <ImageBackground source={require('../../assets/images/engine/img_table_box_inner.png')} style={{width:65,height:35,alignItems:'center',justifyContent:'center',marginTop:10,marginLeft:10,left:10,}} resizeMode='stretch' imageStyle={{borderRadius:5}}>
                            <Text style={{color:'white',fontWeight:'600',fontSize:14,textAlign:'center'}}>{item.End}</Text>
                        </ImageBackground>
                        <TouchableOpacity style={{top:5,borderWidth:1,borderColor:'transparent',width:40,marginLeft:5,}}
                        onPress={()=>onPlusEnd(item.id)}>
                            <ImageBackground source={require('../../assets/images/engine/basic_btn.png')} style={{width:40,height:45,left:5,}} resizeMode='stretch'>
                                <Image source={require('../../assets/images/engine/icon_triangle_down.png')} style={{width:25,height:25,top:10,left:8,transform: [{ rotate: '180 deg' }],}} resizeMode='stretch'/>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity style={{top:5,borderWidth:1,borderColor:'transparent',width:40,left:2,}}
                         onPress={()=>onMinusEnd(item.id)}>
                            <ImageBackground source={require('../../assets/images/engine/basic_btn.png')} style={{width:40,height:45,right:3,}} resizeMode='stretch'>
                                <Image source={require('../../assets/images/engine/icon_triangle_down.png')} style={{width:25,height:25,top:10,left:7,}} resizeMode='stretch'/>                            
                            </ImageBackground>
                        </TouchableOpacity>
                        <ImageBackground source={require('../../assets/images/engine/img_table_box_inner.png')} style={{width:65,height:35,alignItems:'center',justifyContent:'center',marginTop:10,marginLeft:8,}} resizeMode='stretch' imageStyle={{borderRadius:5}}>
                            <Text style={{color:'white',fontWeight:'600',fontSize:14,textAlign:'center'}}>{item.Time}</Text>
                        </ImageBackground>
                        <TouchableOpacity style={{top:5, borderWidth:1,borderColor:'transparent',width:40}}
                        onPress={()=>onTimePlus(item.id)}>
                            <ImageBackground source={require('../../assets/images/engine/basic_btn.png')} style={{width:40,height:45,left:5,}} resizeMode='stretch'>
                                <Image source={require('../../assets/images/engine/icon_triangle_down.png')} style={{width:25,height:25,top:10,left:8,transform: [{ rotate: '180 deg' }],}} resizeMode='stretch'/>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity style={{top:5, borderWidth:1,borderColor:'transparent',width:40}}
                        onPress={()=>onTimeMinus(item.id)}>
                            <ImageBackground source={require('../../assets/images/engine/basic_btn.png')} style={{width:40,height:45,}} resizeMode='stretch'>
                                <Image source={require('../../assets/images/engine/icon_triangle_down.png')} style={{width:25,height:25,top:10,left:7}} resizeMode='stretch'/>                            
                            </ImageBackground>
                        </TouchableOpacity>
                        </View>
                        ))}
                        {/* 마무리 */}
                        </View>                                            
                    </ImageBackground>
                    <ImageBackground source={require('../../assets/images/engine/bg_table_off.png')} style={{width:550,height:400,left:45,top:60,position:'relative',marginLeft:40}} imageStyle={{borderRadius:10}}>
                    <View style={{flex:1,borderWidth:1,borderColor:'transparent',right:5,}}>
                    {profile2.map((item,index)=> (
                        <View  style={{flexDirection:'row',bottom:5,height:35,marginTop:3,}} key={item.id}>
                        <ImageBackground source={require('../../assets/images/engine/img_table_num_bg.png')} style={{width:65,height:35,left:15,alignItems:'center',justifyContent:'center',marginTop:10,}} resizeMode='stretch' imageStyle={{borderRadius:5}}>
                            <Text style={{color:'white',fontSize:14,textAlign:'center'}}>{item.num}</Text>
                        </ImageBackground>
                        <ImageBackground source={require('../../assets/images/engine/img_table_box_inner.png')} style={{width:65,height:35,left:25,alignItems:'center',justifyContent:'center',marginTop:10,}} resizeMode='stretch' imageStyle={{borderRadius:5}}>
                            <Text style={{color:'white',fontWeight:'600',fontSize:14,textAlign:'center'}}>{item.Start}</Text>
                        </ImageBackground>
                        <TouchableOpacity style={{left:20,top:5,borderWidth:1,borderColor:'transparent',width:40,}}
                        onPress={()=>onPlusStart(item.id)}
                        >
                            <ImageBackground source={require('../../assets/images/engine/basic_btn.png')} style={{width:40,height:45,left:10,}} resizeMode='stretch'>
                                <Image source={require('../../assets/images/engine/icon_triangle_down.png')} style={{width:25,height:25,top:10,left:8,transform: [{ rotate: '180 deg' }],}} resizeMode='stretch'/>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginLeft:15,top:5,borderWidth:1,borderColor:'transparent',width:40}}
                        onPress={()=>onMinusStart(item.id)}>
                            <ImageBackground source={require('../../assets/images/engine/basic_btn.png')} style={{width:40,height:45,left:10,}} resizeMode='stretch'>
                                <Image source={require('../../assets/images/engine/icon_triangle_down.png')} style={{width:25,height:25,top:10,left:7,}} resizeMode='stretch'/>                            
                            </ImageBackground>
                        </TouchableOpacity>
                        <ImageBackground source={require('../../assets/images/engine/img_table_box_inner.png')} style={{width:65,height:35,alignItems:'center',justifyContent:'center',marginTop:10,marginLeft:10,left:10,}} resizeMode='stretch' imageStyle={{borderRadius:5}}>
                            <Text style={{color:'white',fontWeight:'600',fontSize:14,textAlign:'center'}}>{item.End}</Text>
                        </ImageBackground>
                        <TouchableOpacity style={{top:5,borderWidth:1,borderColor:'transparent',width:40,marginLeft:5,}}
                        onPress={()=>onPlusEnd(item.id)}>
                            <ImageBackground source={require('../../assets/images/engine/basic_btn.png')} style={{width:40,height:45,left:5,}} resizeMode='stretch'>
                                <Image source={require('../../assets/images/engine/icon_triangle_down.png')} style={{width:25,height:25,top:10,left:8,transform: [{ rotate: '180 deg' }],}} resizeMode='stretch'/>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity style={{top:5,borderWidth:1,borderColor:'transparent',width:40,left:2,}}
                         onPress={()=>onMinusEnd(item.id)}>
                            <ImageBackground source={require('../../assets/images/engine/basic_btn.png')} style={{width:40,height:45,right:3,}} resizeMode='stretch'>
                                <Image source={require('../../assets/images/engine/icon_triangle_down.png')} style={{width:25,height:25,top:10,left:7,}} resizeMode='stretch'/>                            
                            </ImageBackground>
                        </TouchableOpacity>
                        <ImageBackground source={require('../../assets/images/engine/img_table_box_inner.png')} style={{width:65,height:35,alignItems:'center',justifyContent:'center',marginTop:10,marginLeft:8,}} resizeMode='stretch' imageStyle={{borderRadius:5}}>
                            <Text style={{color:'white',fontWeight:'600',fontSize:14,textAlign:'center'}}>{item.Time}</Text>
                        </ImageBackground>
                        <TouchableOpacity style={{top:5, borderWidth:1,borderColor:'transparent',width:40}}
                        onPress={()=>onTimePlus(item.id)}>
                            <ImageBackground source={require('../../assets/images/engine/basic_btn.png')} style={{width:40,height:45,left:5,}} resizeMode='stretch'>
                                <Image source={require('../../assets/images/engine/icon_triangle_down.png')} style={{width:25,height:25,top:10,left:8,transform: [{ rotate: '180 deg' }],}} resizeMode='stretch'/>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity style={{top:5, borderWidth:1,borderColor:'transparent',width:40}}
                        onPress={()=>onTimeMinus(item.id)}>
                            <ImageBackground source={require('../../assets/images/engine/basic_btn.png')} style={{width:40,height:45,}} resizeMode='stretch'>
                                <Image source={require('../../assets/images/engine/icon_triangle_down.png')} style={{width:25,height:25,top:10,left:7}} resizeMode='stretch'/>                            
                            </ImageBackground>
                        </TouchableOpacity>
                        </View>
                        ))}           
                    </View>   
                                  
                    </ImageBackground>
                </View>
                </>
        }
     </SafeAreaView>
            </View>
                    
        </View>
    )
}
const textStyle= StyleSheet.create({
    text1:{
        color: 'white',
        fontWeight: 'bold',
        position: 'absolute',
        fontSize: 20,
        left: 65,
        top: 85,
    },
    load:{
        color:'white',
        fontWeight:"400",
        position:'absolute',
        fontSize:14,
        left:33,
        top:13,
    },
    save:{
        color:'white',
        fontWeight:"400",
        position:'absolute',
        fontSize:14,
        left:55,
        top:20,
    },
    edit:{
        color:'white',
        fontWeight:"400",
        position:'absolute',
        fontSize:14,
        left:55,
        top:18,
    },
    edit2:{
        color:'white',
        fontWeight:"400",
        position:'absolute',
        fontSize:14,
        left:50,
        top:18,
    },
})
export default JerkPrevent;
