import React, {useEffect, useState} from 'react';
import {
  //StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { VictoryChart, VictoryBar, VictoryAxis, /* Defs, LinearGradient, Stop */} from 'victory-native';

const fetchChartData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const preGeneratedData = Array.from({ length: 20 }, (_, index) => ({
        x: String(index + 1).padStart(2, '0'),
        y: Math.floor(Math.random() * 101),
      }));
      resolve(preGeneratedData);
    }, 1500); // 2초 후에 데이터를 반환하는 가정
  });
};
const MileChart = () => {
  const [chartData, setChartData] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // 데이터 로딩
    fetchChartData()
      .then((data) => {
        setChartData(data);
        setLoading(false); // 데이터 로딩 완료 후 로딩 상태 변경
      })
      .catch((error) => {
        console.error('Error loading chart data: ', error);
        setLoading(false); // 데이터 로딩 실패 시에도 로딩 상태 변경
      });
  }, []);
    return(
        <View>
          {loading ?( <ActivityIndicator size="large" color="blue" style={{bottom:100,}}/>
      ) : (
        <View>
          <VictoryChart width={800}height={300} domainPadding={{ x: 10 }}>
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
            dependentAxis offsetX={40}
            crossAxis={false}
            style={{axis:{stroke:'transparent',axisLabel:{fontSzie:20,fill:'#848792'}
            },
            ticks:{stroke:'transparent',size:5,},tickLabels:{fontSize:15,padding:5,fill:'#848792'},
            grid: { stroke: "#848792", strokeDasharray: "1", strokeWidth: 1 ,opacity:"1"},
            }}
            standalone={true}
            />
            <VictoryAxis label="Month"
            offsetY={40}
            style={{axis:{stroke:'transparent',axisLabel:{fontSzie:20,fill:'#848792'}},
            ticks:{stroke:'transparent',size:5,},tickLabels:{fontSize:15,padding:5,fill:'#848792'},            
            }}
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