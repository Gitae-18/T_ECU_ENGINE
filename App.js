/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 * @format
 */

import React,{ /* useState */ }from 'react';




import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import {
 /*  SafeAreaView, */
  /* ScrollView, */
/*   StatusBar, */
  //StyleSheet,
  //Text,
  useColorScheme,
  //View,
  //Image,
  //ImageBackground,
  //Pressable,
  //TouchableOpacity,
} from 'react-native';

/* import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen'; */


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';



  

  return (

    <NavigationContainer>
      <AuthStack/>
    </NavigationContainer>
  );
};




export default App;