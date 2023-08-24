import React, {memo,useState, useRef, useEffect, useCallback, useLayoutEffect} from 'react';
import { check, PERMISSIONS, request } from 'react-native-permissions';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Pressable,
  TouchableOpacity,
  Animated,
  SafeAreaView,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
  FlatList,
  linearGradient,
  Linking,
  Share,
} from 'react-native';
import XLSX from 'xlsx';
import RNFS from 'react-native-fs';

const VehicleInfo = () => {
    const [filePath, setFilePath] = useState('');
    const data = [1,2,3,4,5,6,7,8,9,10]
    const sample_data_to_export = [
        // JSON 데이터 샘플
        { Name: 'John', Age: 30, Country: 'USA' },
        { Name: 'Alice', Age: 25, Country: 'Canada' },
        { Name: 'Bob', Age: 35, Country: 'UK' },
      ];
      
   /*  const exportDataToExcel = () => {
        check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
        .then((result) => {
            if (result === 'granted') {
            // 권한이 이미 부여된 경우
            // 파일 저장 및 다운로드 진행
            console.log('check')
            let wb = XLSX.utils.book_new();
            let ws = XLSX.utils.json_to_sheet(sample_data_to_export)    
            XLSX.utils.book_append_sheet(wb,ws,"Users")
            const wbout = XLSX.write(wb, {type:'binary', bookType:"xlsx"});
            const excelFileName = 'nameinfo.xlsx';
            const excelFilePath = RNFS.DocumentDirectoryPath + '/' + excelFileName;
            console.log('Writing Excel file...');
            RNFS.writeFile(excelFilePath, wbout, 'ascii')
              .then(() => {
                console.log('Excel file successfully created and saved:', excelFilePath);
                setFilePath(excelFilePath); // 파일 경로 저장
              })
              .catch((error) => {
                console.error('Error while creating or saving Excel file:', error);
              })
              .then(()=>{
                handleDownload();
                console.log('파일 다운이 완료되었습니다.')
              })
              .catch((error) => {
                console.error('파일 다운 불가 :', error);
              })
            } else {
                request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then((result) =>{
                    if(result === 'granted'){
                        console.log('check')
                        let wb = XLSX.utils.book_new();
                        let ws = XLSX.utils.json_to_sheet(sample_data_to_export)    
                        XLSX.utils.book_append_sheet(wb,ws,"Users")
                        const wbout = XLSX.write(wb, {type:'binary', bookType:"xlsx"});

                        // Write generated excel to Storage
                        RNFS.mkdir(RNFS.ExternalStorageDirectoryPath)
                        RNFS.writeFile(RNFS.ExternalStorageDirectoryPath + `/nameinfo.xlsx`, wbout, 'ascii')
                        setFilePath(excelFilePath)
                        .then((r)=>{
                        console.log('Success');   
                        handleDownload();                  
                        }).catch((e)=>{
                        console.log('Error', e);
                        });
                        }
                    else{
                        console.error('권한이 거부되었습니다.');
                    }
                } );
                }
            })
            .catch((error)=>{
                console.error('권한 체크 오류:', error);
            });         
                
      }
      const handleDownload = () => {
        if (filePath){
            RNFS.readFile(filePath, 'base64')
            .then((fileData) => {
              const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
              const base64Data = `data:${fileType};base64,${fileData}`;
              Linking.openURL(base64Data);
            })
            .catch((error) => {
              console.error('Error while opening the file:', error);
            });
        } else {
            console.warn('Excel 파일이 아직 생성되지 않았습니다.');
          }
      } */
      const exportDataToExcel = () => {
        console.log('Creating Excel file...');
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(sample_data_to_export);
        XLSX.utils.book_append_sheet(wb, ws, 'Users');
        const wbout = XLSX.write(wb, { type: 'binary', bookType: 'xlsx' });
  
        const excelFileName = 'nameinfo.xlsx';
  
        // 앱 내부 저장소 경로
        const internalFilePath = RNFS.DocumentDirectoryPath + '/' + excelFileName;
  
        console.log('Writing Excel file...');
        RNFS.writeFile(internalFilePath, wbout, 'ascii')
          .then(() => {
            console.log('Excel file successfully created and saved:', internalFilePath);
            setFilePath(internalFilePath); // 파일 경로 저장
  
            // 파일이 생성되면 자동으로 다운로드
            Linking.openURL(`file://${internalFilePath}`)
          })          
          .catch((error) => {
            console.error('Error while creating or saving Excel file:', error);
          });
      };
    return(
        <View style={{flex:1,top:0}}>
        <Text style={{ color: 'white',fontWeight: 'bold',position: 'absolute',fontSize: 20,left:30,top:80,}}>· 차량 등록 정보</Text>
        <TouchableOpacity onPress={exportDataToExcel}>
          <ImageBackground source={require('../../assets/images/engine/basic_btn.png')} style={{width:120,height:60,top:70,left:730,justifyContent:'center',alignItems:'center',padding:5,}}imageStyle={{borderRadius:10}}resizeMode="stretch">
            <Text style={{color:'white',fontSize:14,fontWeight:'bold',fontFamily:'Inter',}}>Excel</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity>
          <ImageBackground source={require('../../assets/images/engine/basic_btn.png')} style={{width:120,height:60,top:70,left:830,justifyContent:'center',alignItems:'center',padding:5,}}imageStyle={{borderRadius:10}}resizeMode="stretch">
            <Image source={require('../../assets/images/engine/menu.png')}style={{width:'100%',height:'100%'}} resizeMode='center'/>
          </ImageBackground>
        </TouchableOpacity>
        <View style={{flex:1}}>
        <Text style={{  color:'white',      fontWeight:'bold',      position: 'absolute',    fontSize:15,top:140,left:50,}}>Time</Text>
        <Text style={{color:'white',
          fontWeight:'bold',
          position: 'absolute',
          fontSize:15,
          top:140,
          left:110,}}>Today</Text>
          <Text style={{color:'white',
          fontWeight:'bold',
          position: 'absolute',
          fontSize:15,
          top:140,
          left:180,}}>Last Day</Text>
          <Text style={{color:'white',
          fontWeight:'bold',
          position: 'absolute',
          fontSize:15,
          top:140,
          left:260,}}>Same day last year</Text>
          <Text style={{color:'white',
          fontWeight:'bold',
          position: 'absolute',
          fontSize:15,
          top:140,
          left:410,}}>Average</Text>
          </View>
          <View style={{flex:1}}>
        <Text style={{color:'white',
          fontWeight:'bold',
          position: 'absolute',
          fontSize:15,
          top:140,
          left:510,}}>Time</Text>
        <Text style={{color:'white',
          fontWeight:'bold',
          position: 'absolute',
          fontSize:15,
          top:140,
          left:565,}}>Today</Text>
          <Text style={{color:'white',
          fontWeight:'bold',
          position: 'absolute',
          fontSize:15,
          top:140,
          left:635,}}>Last Day</Text>
          <Text style={{color:'white',
          fontWeight:'bold',
          position: 'absolute',
          fontSize:15,
          top:140,
          left: 720,}}>Same day last year</Text>
          <Text style={{color:'white',
          fontWeight:'bold',
          position: 'absolute',
          fontSize:15,
          top:140,
          left:865,}}>Average</Text>
          </View>
          <View style={{flex:1,top:170,flexDirection:'row'}}>
           <ImageBackground source={require('../../assets/images/engine/bg_table_off.png')} style={{width:450,height:350,left:40}} imageStyle={{borderRadius:20}}>
            <ImageBackground source={require('../../assets/images/engine/Rectangle_111.png')} style={{width:420,height:30,top:30,left:10,justifyContent:'center',alignItems:'baseline'}} imageStyle={{borderRadius:10,}}>
              <View style={{flexDirection:'row'}}>
              <Text style={{color:'white',fontSize:15,left:20,top:7,}}>1</Text>
              <Image source={require('../../assets/images/engine/Vector_128.png')} style={{left:35,}}/>
              <Text style={{color:'white',fontSize:15,left:40,top:7,}}>35.12</Text>
              <Image source={require('../../assets/images/engine/Vector_128.png')} style={{left:50,}}/>
              <Text style={{color:'white',fontSize:15,left:70,top:7,}}>39.45</Text>
              <Image source={require('../../assets/images/engine/Vector_128.png')} style={{left:90,}}/>
              <Text style={{color:'white',fontSize:15,left:140,top:7,}}>42.23</Text>
              <Image source={require('../../assets/images/engine/Vector_128.png')} style={{left:190,}}/>
              <Text style={{color:'white',fontSize:15,left:200,top:7,}}>35.23</Text>
              </View>
            </ImageBackground>
          </ImageBackground>
          <ImageBackground source={require('../../assets/images/engine/bg_table_off.png')} style={{width:450,height:350,marginLeft:50,}} imageStyle={{borderRadius:20}}>
            <ImageBackground source={require('../../assets/images/engine/Rectangle_111.png')} style={{width:420,height:30,top:30,left:10,justifyContent:'center',alignItems:'baseline'}} imageStyle={{borderRadius:10,}}>
              <View style={{flexDirection:'row'}}>
              <Text style={{color:'white',fontSize:15,left:20,top:7,}}>1</Text>
              <Image source={require('../../assets/images/engine/Vector_128.png')} style={{left:35,}}/>
              <Text style={{color:'white',fontSize:15,left:40,top:7,}}>35.12</Text>
              <Image source={require('../../assets/images/engine/Vector_128.png')} style={{left:50,}}/>
              <Text style={{color:'white',fontSize:15,left:70,top:7,}}>39.45</Text>
              <Image source={require('../../assets/images/engine/Vector_128.png')} style={{left:90,}}/>
              <Text style={{color:'white',fontSize:15,left:140,top:7,}}>42.23</Text>
              <Image source={require('../../assets/images/engine/Vector_128.png')} style={{left:190,}}/>
              <Text style={{color:'white',fontSize:15,left:200,top:7,}}>35.23</Text>
              </View>
            </ImageBackground>
          </ImageBackground>
          </View>
        </View>  
    )
}

export default VehicleInfo;