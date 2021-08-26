import React from 'react'

import { createStackNavigator  } from '@react-navigation/stack'
import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';



const RootStack = createStackNavigator();

const rootStackScreen = () => {
    return(
        <RootStack.Navigator headerMode='none'>
            <RootStack.Screen name='SplashScreen' component={SplashScreen} />
            <RootStack.Screen name='LoginScreen' component={LoginScreen} />
            <RootStack.Screen name='Register' component={RegisterScreen} />
        </RootStack.Navigator>
    )
}

export default rootStackScreen