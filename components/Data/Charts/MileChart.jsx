import React, {useEffect, useState, useCallback} from 'react';
import {
  //StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { VictoryChart, VictoryBar, VictoryAxis, /* Defs, LinearGradient, Stop */} from 'victory-native';
import moment from 'moment';
import { useDispatch,useSelector } from 'react-redux';
import {initializeApp,firebase} from '@react-native-firebase/app';
import {collection, addDoc , getDocs, serverTimestamp, deleteDoc, doc, getFirestore, query, updateDoc, orderBy} from "@react-native-firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
if(!firebase.apps.length){
  initializeApp();
}
const db = getFirestore();
const MileChart = ({select}) => {
  console.log(select)
  const [update, setUpdate] = useState(true);
  const [preGeneratedData, setPreGeneratedData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [distance, setDistance] = useState();
  const dispatch = useDispatch();
  const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
  const fetchChartData =  async() => {
    const preGenerated = Array.from({ length: 30 }, (_, index) => ({
      x: String(index + 1).padStart(2, '0'),
      y: Math.floor(Math.random() * 101),  
    }));
    setPreGeneratedData(preGenerated);
    setChartData(preGenerated);
  };
  const getChartData = useCallback( async() => {
    const getProfileRef = query(collection(db,'miles'));
    const listSnap = await getDocs(getProfileRef);
    const data = listSnap.docs.map(doc=>({
      data:doc.data(),
    }));
  },[])
  useEffect(() => {   
    fetchChartData();
    getChartData();
  }, []);
  const AxisChange = useCallback(async() => {
    let preGen = [];
    switch(select)
    {
      case 'time':
         preGen = Array.from({ length: 12 }, (_, index) => ({
          x: String(index + 1).padStart(2, '0'),
          y: Math.floor(Math.random() * 30),  
        }));
        setChartData(preGen);
        break;
      case 'day':
        preGen = Array.from({ length: 24 }, (_, index) => ({
          x: String(index + 1).padStart(2, '0'),
          y: Math.floor(Math.random() * 60),  
        }));
        setChartData(preGen);
        break;
      case 'month':
        preGen = Array.from({ length: 30 }, (_, index) => ({
          x: String(index + 1).padStart(2, '0'),
          y: Math.floor(Math.random() * 101),  
        }));
        setChartData(preGen);
        break; 
      case 'year':
        preGen = Array.from({ length: 12 }, (_, index) => ({
          x: String(index + 1).padStart(2, '0'),
          y: Math.floor(Math.random() * 1000),  
        }));
        setChartData(preGen);
        break; 
      default:
        break;
    }
  },[select])
  useEffect(()=> {
    AxisChange();
  },[select])
  const fetchDiscatnce = useCallback(async()=> {
    try {
      const storedMile = await AsyncStorage.getItem('mile');
      if (storedMile) {
      } else {
        console.log("No data found in AsyncStorage.");
      }
    } catch (error) {
      console.error("Error fetching data from AsyncStorage:", error);
    }
  },[AsyncStorage])
  const fetchStoredDistance = useCallback(async () => {
    const storedDistance = parseFloat(await AsyncStorage.getItem('distance'));
    const todayDate = new Date().getDate();  
  // "오늘의 날짜"를 찾음
  const todayData = preGeneratedData.find((item) => parseInt(item.x) === todayDate);
  
  if (todayData && storedDistance !== null) {
    // 이전 값을 가져옴
    const prevStoredDistance = parseFloat(todayData.y);

    // 차이가 1 이상인 경우에만 "y" 값에 추가
    const difference = Math.round(storedDistance) - Math.round(prevStoredDistance);
    if (difference >= 1) {
      todayData.y += difference;
    }
    }
    //console.log(preGeneratedData);
    for (var i = 0; i < preGeneratedData.length; i++) {
/*       if (preGeneratedData[i].x === "07") {
        preGeneratedData[i].y = 90;
        break; // 찾았으면 루프를 종료
      } */
    }
  }, [AsyncStorage,distance]);
  //console.log(chartData);
    useEffect(() => {
    // 데이터 로딩
    try{    
    fetchStoredDistance()
      .then((data) => {
        setLoading(false); // 데이터 로딩 완료 후 로딩 상태 변경
       /*  const yValues = chartData.map(item => item.y);
        // y 값 배열의 평균을 계산합니다.
        const sum = yValues.reduce((acc, y) => acc + y, 0);
        const min = Math.min(...yValues);
        const max = Math.max(...yValues);
        setTotal(max);
        setAverage(sum / yValues.length);
        setLeast(min);
        dispatch(setAverageData(average));
        dispatch(setTotalData(total));
        dispatch(setLeastData(least)); */
      })
      .catch((error) => {
        console.error('Error loading chart data: ', error);
        setLoading(false); // 데이터 로딩 실패 시에도 로딩 상태 변경
      });
      fetchStoredDistance();
      fetchDiscatnce();
    }
    catch(error){
      console.log(error);
    } 
  }, [loading, /* total, average, least, */ fetchStoredDistance, distance]);
  const AddDoc = () => {

  }
  useEffect(() => {
    const intervalId = setInterval(() => {
      AddDoc();
    }, 24 * 60 * 60 * 1000); // 24시간 마다 호출되도록 설정 (24시간 = 24 * 60 * 60 * 1000 밀리초)
  
    return () => clearInterval(intervalId); // 컴포넌트가 언마운트될 때 interval 정리
  }, []);

    return(
        <View>
          {loading ?( <ActivityIndicator size="large" color="blue" style={{bottom:100,}}/>
      ) : (
        <View>
          <VictoryChart width={1100}height={400} domainPadding={{ x: 10 }}>
            <VictoryBar
            barRatio={0.7}
             style={{
              data: { fill : 'gold'},
              parent: { border: "1px solid #ccc"},
              labels: {
                  fontSize: 15,
                  fill:"white"
                },
            }}
              data={chartData}
             /*  categories={{x:['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20']}} */
              animate={{onLoad:{duration:500}}}
              events={[{
                target: "data",
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        target: "data",
                        mutation: (props) => {
                          const fill = props.style && props.style.fill;
                          return fill === "black" ? null : { style: { fill: "gold" } };
                        }
                      }
                    ];
                  }
                }
              }]}
            />
            <VictoryAxis label="Kw"
            /* domain={{y:[0,100]}} */
            dependentAxis offsetX={40}
            crossAxis={false}
            style={{axis:{stroke:'transparent',axisLabel:{fontSize:20,fill:'#848792'}
            },
            ticks:{stroke:'transparent',size:5,},tickLabels:{fontSize:15,padding:5,fill:'#848792'},
            grid: { stroke: "#848792", strokeDasharray: "1", strokeWidth: 1 ,opacity:"1"},
            }}
            standalone={true}
            />
            <VictoryAxis label="Month"
            offsetY={50}
            style={
              {axis:{stroke:'transparent',axisLabel:{fontSzie:20,fill:'#848792'},tickLabels:{fill:'#848792'},
            },
            ticks:{stroke:'transparent',size:5,},tickLabels:{fontSize:15,padding:5,fill:'#848792'},                        
            axisLabel:{fontSize: 15,fill:'#848792',padding:30,}}}
            />
          </VictoryChart>
          <Text style={{color:'#848792',fontSize:14,bottom:35,left:17,}}>Kw</Text>
          </View>
      )
        }
          </View>
    )
}
export default MileChart;