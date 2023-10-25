/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 * @format
 */

import React,{ /* useState */useEffect }from 'react';




import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import { Provider } from 'react-redux';
import store from './components/store/store';
import SplashScreen from 'react-native-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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

  useEffect(()=>{
    SplashScreen.hide();
  },[]);
  return (
    <Provider store={store}>
    <NavigationContainer>
      <AuthStack/>
    </NavigationContainer>
    </Provider>
  );
};




export default App;