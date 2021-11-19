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
import { colors } from 'react-native-elements';
import { useTheme } from 'react-native-paper';

const HomeStack = createStackNavigator()
const doisStack = createStackNavigator()
const tresStack = createStackNavigator()
const Tab = createMaterialBottomTabNavigator();
const MainTabScreen = () => {
  const theme = useTheme()
    return (
        <Tab.Navigator
          initialRouteName="Home"
          activeColor={'#fff'}
          barStyle={{ backgroundColor: theme.dark ? '#333333' : "#fff" }}
        >
          <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            
          />
          
        </Tab.Navigator>
      );
}
const HomeStackScreen = ({navigation}) => {
  return(
   <HomeStack.Navigator screenOptions = {{headerStyle: { backgroundColor: AZUL_ESCURO_COLOR  }, headerTintColor: CINZA_COLOR,  headerTitleStyle: 'bold'}}>
     <HomeStack.Screen name={'Home'} component={HomeScreen} options={{
       title : '',
       headerTitleAlign: 'center',
       headerLeft: () => (
         <Icon.Button name='ios-menu' size={25} backgroundColor={AZUL_ESCURO_COLOR} color={CINZA_COLOR} onPress={() => navigation.openDrawer()} ></Icon.Button>
       )
     }}/> 
   </HomeStack.Navigator>
  )
 }
   

   export default MainTabScreen
   