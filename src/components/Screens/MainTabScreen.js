import React from 'react'
import { AZUL_ESCURO_COLOR,AZUL_CLARO_COLOR,CINZA_AZULADO_COLOR,CINZA_COLOR,VERMELHO_COLOR,VERDE_COLOR,SALDO_COLOR,COMERCIAL_COLOR,SUPORTE_COLOR} from '../globalStyles'
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import HomeScreen from './HomeScreen';
import Icon from 'react-native-vector-icons/Ionicons'
import FA from 'react-native-vector-icons/FontAwesome5'
import Feather from 'react-native-vector-icons/Feather'
import doisScreen from  './DoisScreen';
import tresScreen from './TresScreen';

const HomeStack = createStackNavigator()
const doisStack = createStackNavigator()
const tresStack = createStackNavigator()
const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {
    return (
        <Tab.Navigator
          initialRouteName="Home"
          activeColor={'#fff'}
          barStyle={{ backgroundColor: AZUL_ESCURO_COLOR }}
        >
          <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarColor: AZUL_CLARO_COLOR, 
              tabBarIcon: ({ color }) => (
                <Icon name="ios-home" color={color} size={24} />
              ),
            }}
          />
          <Tab.Screen
            name="Teladois"
            component={doisStackScreen}
            options={{
              tabBarLabel: 'Transferencias',
              tabBarColor: VERMELHO_COLOR, 
              tabBarIcon: ({ color }) => (
                <FA name="exchange-alt" color={color} size={24} />
              ),
            }}
          />
          <Tab.Screen
            name="Telatres"
            component={tresStackScreen}
            options={{
              tabBarLabel: 'Extrato',
              tabBarColor: VERDE_COLOR, 
              tabBarIcon: ({ color }) => (
                <Feather name="list" color={color} size={24} />
              ),
            }}
          />
          
        </Tab.Navigator>
      );
}
const HomeStackScreen = ({navigation}) => {
  return(
   <HomeStack.Navigator screenOptions = {{headerStyle: { backgroundColor: AZUL_CLARO_COLOR  }, headerTintColor: CINZA_COLOR,  headerTitleStyle: 'bold'}}>
     <HomeStack.Screen name={'Home'} component={HomeScreen} options={{
       title : '',
       headerTitleAlign: 'center',
       headerLeft: () => (
         <Icon.Button name='ios-menu' size={25} backgroundColor={AZUL_CLARO_COLOR} color={CINZA_COLOR} onPress={() => navigation.openDrawer()} ></Icon.Button>
       )
     }}/> 
   </HomeStack.Navigator>
  )
 }
const doisStackScreen = ({navigation}) => {
    return(
     <doisStack.Navigator screenOptions = {{headerStyle: { backgroundColor: AZUL_ESCURO_COLOR  }, headerTintColor: CINZA_COLOR,  headerTitleStyle: 'bold'}}>
       <doisStack.Screen name={'Dois'} component={doisScreen} options={{
         title : '',
         headerTitleAlign: 'center',
         headerLeft: () => (
           <Icon.Button name='ios-menu' size={25} backgroundColor={AZUL_ESCURO_COLOR} color={CINZA_COLOR} onPress={() => navigation.openDrawer()} ></Icon.Button>
         )
       }}/> 
     </doisStack.Navigator>
    )
   }
   const tresStackScreen = ({navigation}) => {
     return(
       <tresStack.Navigator screenOptions = {{headerStyle: { backgroundColor: AZUL_ESCURO_COLOR  }, headerTintColor: CINZA_COLOR,  headerTitleStyle: 'bold'}}>
         <tresStack.Screen name={'Teladois'} component={tresScreen} options={{
         title : '',
         headerTitleAlign: 'center',
         headerLeft: () => (
           <Icon.Button name='ios-menu' size={25} backgroundColor={AZUL_ESCURO_COLOR} onPress={() => navigation.openDrawer()} ></Icon.Button>
         )
       }}/>  
       </tresStack.Navigator>
     )
   }
   

   export default MainTabScreen
   