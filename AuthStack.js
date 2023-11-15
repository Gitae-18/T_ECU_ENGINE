import React,{useEffect} from "react";

import Home from './components/Home';
import Setting from './components/Setting';
import Sidebar from './components/Sidebar';
import System from './components/System';
import Data from './components/Data';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

  const AuthStack = () =>{
    return(
      <Stack.Navigator initialRouteName="Home" 
    screenOptions={{headerStyle:{backgroundColor:'black'},cardStyle:{backgroundColor:'transparent',flex:1,presentaion:'card'},animationEnabled: false,}}>          
      <Stack.Screen name="DashBoard" component={Home} options={{
          headerShown: false,unmountOnBlur: true,
        }}/>
        <Stack.Screen name="Setting" component={Setting} options={{
          headerShown: false,unmountOnBlur: true,
        }}
        
        />
        <Stack.Screen name="Sidebar" component={Sidebar} options={{
          headerShown: false,unmountOnBlur: true,
        }}/>
         <Stack.Screen name="System" component={System} options={{
          headerShown: false,unmountOnBlur: true,
        }}/>
         <Stack.Screen name="Data" component={Data} options={{
          headerShown: false,unmountOnBlur: true,
        }}/>
    </Stack.Navigator>
    )
  }

  export default AuthStack;