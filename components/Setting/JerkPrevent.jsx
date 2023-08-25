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
import {VictoryLine, VictoryChart, VictoryTheme} from 'victory-native';

const JerkPrevent = () =>{
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [graph,setGraph] = useState(false);
    const [start,setStart] = useState(0);
    const [end,setEnd] = useState(0);
    const [time,setTime] = useState(300);
    const [items, setItems] = useState([
        {label: 'FWD3', value: 'item1',selected:true},
        {label: 'aaa', value: 'aaa'},
        {label: 'bbb', value: 'bbb'}
        ]);

    const handleChangeGraph = (e)=> {
        setGraph(!graph);
    }
    const onPlusStart = () => {
        const num = start;
        setStart(num+1);
    }
    const onMinusStart = () => {
        const num = start;
        setStart(num-1);
    }
    const onPlusEnd = () => {
        const num = end;
        setEnd(num+1);
    }
    const onMinusEnd = () => {
        const num = end;
        setEnd(num-1);
    }
    return(
        <View style={{flex:1,height:1200}}>
            <View style={{flex:1, top:40, borderWidth:1,borderColor:"transparent"}}>
            <Text style={textStyle.text1}>· 프로파일 편집</Text>
            <SafeAreaView>
            <DropDownPicker style={{backgroundColor:'#161413',left:220,top:38,color:'white',textAlign:'center',minHeight: 40,
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
                backgroundColor: "#dfdfdf",width:160,left:220,top:80,
                }}/>
                <TouchableOpacity
                style={{width:200,left:340,bottom:3}}>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                <ImageBackground source={require('../../assets/images/engine/basic_btn.png')} style={{width:120,height:45}}>
                <Text style={textStyle.load}>불러오기</Text>
                </ImageBackground>
                </View>   
                </TouchableOpacity>
                {/* 프로파일 */}
                <View style={{flex:1,flexDirection:'row',position:'absolute',left:420,}}>
                <TouchableOpacity
                style={{left:130,flex:1,borderColor:'transparent',width:200,position:'absolute',top:30}}>                
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ImageBackground source={require('../../assets/images/engine/basic_btn.png')} style={{width:200,height:60}} resizeMode='stretch' imageStyle={{borderRadius:10}}>
                <Text style={textStyle.save}>프로파일 저장</Text>
                </ImageBackground>
                </View>   
                </TouchableOpacity>
                <TouchableOpacity
                style={{flex:1,width:200,width:200,position:'absolute',left:305,top:30}}
                onPress={handleChangeGraph}>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                <ImageBackground source={require('../../assets/images/engine/basic_btn.png')} style={{width:200,height:60}}resizeMode='stretch' imageStyle={{borderRadius:10}}>
                {graph===true?<Text style={textStyle.edit}>편집 모드 가기</Text>:<Text style={textStyle.edit}>그래프 형태 보기</Text>}
                </ImageBackground>
                </View>   
                </TouchableOpacity>
                </View>
                {/* 프로파일 */}
                {graph===true?
                <>
                <View>
                <ImageBackground source={require('../../assets/images/engine/Rectangle.png')} style={{width:860,height:380,left:45,top:20,position:'relative'}} imageStyle={{borderRadius:10}}>
                    <VictoryChart width={900}height={400}>
                        <VictoryLine  
                         style={{
                            data: { stroke: "#c43a31",strokeWidth:5, },
                            parent: { border: "1px solid #ccc"},
                            labels: {
                                fontSize: 15,
                                fill: ({ datum }) => datum.x === 3 ? "#000000" : "#c43a31"
                              }
                          }}
                        animate={{onLoad:{duration:1000}}}
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
                            data: { stroke: "#313f4f",strokeWidth:5, },
                            parent: { border: "1px solid #ccc"},
                            labels: {
                                fontSize: 15,
                                fill: ({ datum }) => datum.x === 3 ? "#000000" : "#313f4f"
                              }
                          }}
                        animate={{onLoad:{duration:1000}}}
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
                            data: { stroke: "#549f72",strokeWidth:5, },
                            parent: { border: "1px solid #ccc"},
                            labels: {
                                fontSize: 15,
                                fill: ({ datum }) => datum.x === 3 ? "#000000" : "#313f4f"
                              }
                          }}
                        animate={{onLoad:{duration:1000}}}
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
                    </VictoryChart>
                   {/*  <Graph/> */}
                </ImageBackground>
                </View>
                </>
                :
                <>
                <View style={{flex:1}}>
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
                    <ImageBackground source={require('../../assets/images/engine/bg_table_off.png')} style={{width:430,height:380,left:45,top:30,position:'relative'}} imageStyle={{borderRadius:10}}>
                        <View style={{flex:1,borderWidth:1,borderColor:'transparent',right:5,padding:0}}>
                        {/* 1행 */}
                        <View  style={{flex:1,flexDirection:'row',bottom:5,}}>
                        <ImageBackground source={require('../../assets/images/engine/img_table_num_bg.png')} style={{width:60,height:30,left:15,alignItems:'center',justifyContent:'center',marginTop:10,}} resizeMode='stretch' imageStyle={{borderRadius:5}}>
                            <Text style={{color:'white',fontSize:14,textAlign:'center'}}>1</Text>
                        </ImageBackground>
                        <ImageBackground source={require('../../assets/images/engine/img_table_box_inner.png')} style={{width:60,height:30,left:20,alignItems:'center',justifyContent:'center',marginTop:10,}} resizeMode='stretch' imageStyle={{borderRadius:5}}>
                            <Text style={{color:'white',fontWeight:'600',fontSize:14,textAlign:'center'}}>{start}</Text>
                        </ImageBackground>
                        <TouchableOpacity style={{left:15,top:5,}}
                        onPress={onPlusStart}
                        >
                            <ImageBackground source={require('../../assets/images/engine/basic_btn.png')} style={{width:35,height:40}} resizeMode='stretch'>
                                <Image source={require('../../assets/images/engine/icon_triangle_down.png')} style={{width:20,height:20,top:10,left:8,transform: [{ rotate: '180 deg' }],}} resizeMode='stretch'/>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginLeft:7,top:5,}}
                        onPress={onMinusStart}>
                            <ImageBackground source={require('../../assets/images/engine/basic_btn.png')} style={{width:35,height:40}} resizeMode='stretch'>
                                <Image source={require('../../assets/images/engine/icon_triangle_down.png')} style={{width:20,height:20,top:10,left:7,}} resizeMode='stretch'/>                            
                            </ImageBackground>
                        </TouchableOpacity>
                        <ImageBackground source={require('../../assets/images/engine/img_table_box_inner.png')} style={{width:60,height:30,alignItems:'center',justifyContent:'center',marginTop:10,}} resizeMode='stretch' imageStyle={{borderRadius:5}}>
                            <Text style={{color:'white',fontWeight:'600',fontSize:14,textAlign:'center'}}>{end}</Text>
                        </ImageBackground>
                        <TouchableOpacity style={{top:5,}}
                        onPress={onPlusEnd}>
                            <ImageBackground source={require('../../assets/images/engine/basic_btn.png')} style={{width:35,height:40,right:5,}} resizeMode='stretch'>
                                <Image source={require('../../assets/images/engine/icon_triangle_down.png')} style={{width:20,height:20,top:10,left:8,transform: [{ rotate: '180 deg' }],}} resizeMode='stretch'/>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity style={{top:5,}}
                         onPress={onMinusEnd}>
                            <ImageBackground source={require('../../assets/images/engine/basic_btn.png')} style={{width:35,height:40,right:12,}} resizeMode='stretch'>
                                <Image source={require('../../assets/images/engine/icon_triangle_down.png')} style={{width:20,height:20,top:10,left:7,}} resizeMode='stretch'/>                            
                            </ImageBackground>
                        </TouchableOpacity>
                        <ImageBackground source={require('../../assets/images/engine/img_table_box_inner.png')} style={{width:60,height:30,alignItems:'center',justifyContent:'center',marginTop:10,right:14}} resizeMode='stretch' imageStyle={{borderRadius:5}}>
                            <Text style={{color:'white',fontWeight:'600',fontSize:14,textAlign:'center'}}>{time}</Text>
                        </ImageBackground>
                        <TouchableOpacity style={{top:5,}}>
                            <ImageBackground source={require('../../assets/images/engine/basic_btn.png')} style={{width:35,height:40,right:18,}} resizeMode='stretch'>
                                <Image source={require('../../assets/images/engine/icon_triangle_down.png')} style={{width:20,height:20,top:10,left:8,transform: [{ rotate: '180 deg' }],}} resizeMode='stretch'/>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity style={{top:5,}}>
                            <ImageBackground source={require('../../assets/images/engine/basic_btn.png')} style={{width:35,height:40,right:26,}} resizeMode='stretch'>
                                <Image source={require('../../assets/images/engine/icon_triangle_down.png')} style={{width:20,height:20,top:10,left:7}} resizeMode='stretch'/>                            
                            </ImageBackground>
                        </TouchableOpacity>
                        
                        </View>
                    
                        {/* 마무리 */}
                        </View>                                            
                    </ImageBackground>
                    <ImageBackground source={require('../../assets/images/engine/bg_table_off.png')} style={{width:430,height:380,left:45,top:30,position:'relative',marginLeft:5}} imageStyle={{borderRadius:10}}>
                    <View style={{flex:1,borderWidth:1,borderColor:'transparent',right:5,}}>
                        {/* 1행 */}
                        <View  style={{flex:1,flexDirection:'row',bottom:5,}}>
                        <ImageBackground source={require('../../assets/images/engine/img_table_num_bg.png')} style={{width:60,height:30,left:15,alignItems:'center',justifyContent:'center',marginTop:10,}} resizeMode='stretch' imageStyle={{borderRadius:5}}>
                            <Text style={{color:'white',fontSize:14,textAlign:'center'}}>11</Text>
                        </ImageBackground>
                        <ImageBackground source={require('../../assets/images/engine/img_table_box_inner.png')} style={{width:60,height:30,left:20,alignItems:'center',justifyContent:'center',marginTop:10,}} resizeMode='stretch' imageStyle={{borderRadius:5}}>
                            <Text style={{color:'white',fontWeight:'600',fontSize:14,textAlign:'center'}}>300</Text>
                        </ImageBackground>
                        <TouchableOpacity style={{left:15,top:5,}}>
                            <ImageBackground source={require('../../assets/images/engine/basic_btn.png')} style={{width:35,height:40}} resizeMode='stretch'>
                                <Image source={require('../../assets/images/engine/icon_triangle_down.png')} style={{width:20,height:20,top:10,left:8,transform: [{ rotate: '180 deg' }],}} resizeMode='stretch'/>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginLeft:7,top:5,}}>
                            <ImageBackground source={require('../../assets/images/engine/basic_btn.png')} style={{width:35,height:40}} resizeMode='stretch'>
                                <Image source={require('../../assets/images/engine/icon_triangle_down.png')} style={{width:20,height:20,top:10,left:7}} resizeMode='stretch'/>                            
                            </ImageBackground>
                        </TouchableOpacity>
                        <ImageBackground source={require('../../assets/images/engine/img_table_box_inner.png')} style={{width:60,height:30,alignItems:'center',justifyContent:'center',marginTop:10,}} resizeMode='stretch' imageStyle={{borderRadius:5}}>
                            <Text style={{color:'white',fontWeight:'600',fontSize:14,textAlign:'center'}}>300</Text>
                        </ImageBackground>
                        <TouchableOpacity style={{top:5,}}>
                            <ImageBackground source={require('../../assets/images/engine/basic_btn.png')} style={{width:35,height:40,right:5,}} resizeMode='stretch'>
                                <Image source={require('../../assets/images/engine/icon_triangle_down.png')} style={{width:20,height:20,top:10,left:8,transform: [{ rotate: '180 deg' }],}} resizeMode='stretch'/>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity style={{top:5,}}>
                            <ImageBackground source={require('../../assets/images/engine/basic_btn.png')} style={{width:35,height:40,right:12,}} resizeMode='stretch'>
                                <Image source={require('../../assets/images/engine/icon_triangle_down.png')} style={{width:20,height:20,top:10,left:7}} resizeMode='stretch'/>                            
                            </ImageBackground>
                        </TouchableOpacity>
                        <ImageBackground source={require('../../assets/images/engine/img_table_box_inner.png')} style={{width:60,height:30,alignItems:'center',justifyContent:'center',marginTop:10,right:14}} resizeMode='stretch' imageStyle={{borderRadius:5}}>
                            <Text style={{color:'white',fontWeight:'600',fontSize:14,textAlign:'center'}}>300</Text>
                        </ImageBackground>
                        <TouchableOpacity style={{top:5,}}>
                            <ImageBackground source={require('../../assets/images/engine/basic_btn.png')} style={{width:35,height:40,right:18,}} resizeMode='stretch'>
                                <Image source={require('../../assets/images/engine/icon_triangle_down.png')} style={{width:20,height:20,top:10,left:8,transform: [{ rotate: '180 deg' }],}} resizeMode='stretch'/>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity style={{top:5,}}>
                            <ImageBackground source={require('../../assets/images/engine/basic_btn.png')} style={{width:35,height:40,right:26,}} resizeMode='stretch'>
                                <Image source={require('../../assets/images/engine/icon_triangle_down.png')} style={{width:20,height:20,top:10,left:7}} resizeMode='stretch'/>                            
                            </ImageBackground>
                        </TouchableOpacity>
                        
                        </View>                       
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
        left: 55,
        top: 45,
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
        top:20,
    },
})
export default JerkPrevent;
