import React from "react";
import { StyleSheet, View } from "react-native";
import {VictoryLine, VictoryChart, VictoryTheme, VictoryAxis} from 'victory-native';

const data = [
    {time:0.1,current:200},
    {time:0.2,current:250},
    {time:0.3,current:300},
    {time:0.4,current:350},
    {time:0.5,current:400},
    {time:0.6,current:450},
    {time:0.7,current:500},
    {time:0.8,current:550},
    {time:0.9,current:600},
    {time:1.0,current:650},
]

const Graph = () => {
    return(
        <View style={styles.container}>
            <VictoryChart width={800} domainPadding={{ x: 10 }}>
                <VictoryLine data={data} style={{
                    data: { stroke: '#c43a31'},
                    parent:{ border: '1px solid #ccc '},    
                    labels: {
                        fontSize: 15,
                        fill:"white"
                      },                
                }} animate={{duration:1000,onLoad:{duration:500}}}/>
            <VictoryAxis label="Current(mA)"
            dependentAxis offsetX={40}
            crossAxis={true}
            style={{axis:{stroke:'transparent',axisLabel:{fontSzie:20,fill:'#848792'}
            },
            ticks:{stroke:'transparent',size:5,},tickLabels:{fontSize:15,padding:5,fill:'#848792'},
            grid: { stroke: "#848792", strokeDasharray: "1", strokeWidth: 1 ,opacity:"1"},
            }}
            standalone={true}
            />
            <VictoryAxis label="Time(sec)"
            offsetY={40}
            style={{axis:{stroke:'transparent',axisLabel:{fontSzie:20,fill:'#848792'}},
            ticks:{stroke:'transparent',size:5,},tickLabels:{fontSize:15,padding:5,fill:'#848792'},            
            }}
            />
            </VictoryChart>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }
  });
export default Graph;
