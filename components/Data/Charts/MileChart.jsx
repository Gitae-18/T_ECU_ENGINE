import React, {memo,useState, useRef, useEffect, useCallback, useLayoutEffect} from 'react';
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
  linearGradient
} from 'react-native';
import {VictoryLine, VictoryChart, VictoryTheme, VictoryBar, VictoryAxis, VictoryLabel, VictoryContainer, VictoryTooltip, /* Defs, LinearGradient, Stop */} from 'victory-native';


const MileChart = ({data}) => {
   
    return(
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
              data={data}
              animate={{onLoad:{duration:1000}}}
            /*   labelComponent={ <VictoryTooltip
                cornerRadius={0}
                flyoutStyle={{ fill: 'white' }}
                style={{ fontSize: 10 }}
                text={`${datum.label}`}
              />} */
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
export default MileChart;