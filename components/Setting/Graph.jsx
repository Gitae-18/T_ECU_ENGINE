import React from "react";
import { StyleSheet, View } from "react-native";
import {VictoryLine, VictoryChart, VictoryTheme} from 'victory-native';

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
            <VictoryChart width={800} theme={VictoryTheme.material}>
                <VictoryLine data={data} x="Time(sec)" y="Current(mA)" style={{
                    data: { stroke: '#c43a31'},
                    parent:{ border: '1px solid #ccc '},
                    
                }}/>
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
