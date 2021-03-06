import React, { useEffect } from 'react';
import { AZUL_ESCURO_COLOR,AZUL_CLARO_COLOR,CINZA_AZULADO_COLOR,CINZA_COLOR,VERMELHO_COLOR,VERDE_COLOR,SALDO_COLOR,COMERCIAL_COLOR,SUPORTE_COLOR} from './src/components/globalStyles'
import { NavigationContainer,DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';

import { Provider as PaperProvider,DefaultTheme as PaperDefaultTheme, DarkTheme as PaperDarkTheme} from 'react-native-paper'

import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './src/components/Screens/DrawerContent'

import MainTabScreen from './src/components/Screens/MainTabScreen'

import RootStackScreen from './src/components/Screens/RootStackScreen';
import { StatusBarIOS, View, Image } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { AuthContext } from './src/components/config/context';

import  AsyncStorage  from '@react-native-community/async-storage';
import NewDoacao from './src/components/Screens/NewDoacao';

const Drawer = createDrawerNavigator()

function App (){

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  

  const initialLoginState = { 
    isLoading : true,
    userName: null,
    userToken: null,
  }
  const loginReducer = (prevState, action) => {
    switch( action.type){
      case 'RETRIEVE_TOKEN':
        return{
          ...prevState,
          userToken: action.token,
          isLoading:false
        };
      case 'LOGIN':
        return{
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading:false
        };
      case 'LOGOUT':
        return{
          ...prevState,
          userName: null,
          userToken: null,
          isLoading:false
        };
    }
  }
  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState)

  console.log(loginState);
  const authContext = React.useMemo(() => ({
    signIn: async (foundUser, categoria) => {

      const userToken = String(foundUser.userToken);
      const userName = foundUser.username;
      const userEmail = foundUser.email;
      const userId = foundUser.id;
      const CatUser = categoria;

      try {
        await AsyncStorage.setItem('userToken', userToken)
        await AsyncStorage.setItem('userEmail', userEmail)
        await AsyncStorage.setItem('userName', userName)
        await AsyncStorage.setItem('userId', String(userId))
        await AsyncStorage.setItem('categoria', String(CatUser))

        
        
      }catch(e){
        console.log(e)
      }
      dispatch({type: 'LOGIN' , id: userName, token: userToken})
    },
    signOut: async () => {

      try {
        await AsyncStorage.removeItem('userToken')
      }catch(e){
        console.log(e)
      }

      dispatch({type: 'LOGOUT'})
    },
    toggleTheme: () =>{
      setIsDarkTheme(isDarkTheme => !isDarkTheme)
    }
  }),[])

  useEffect(() =>{
    setTimeout(async () =>{
      let userToken;
      userToken = null;
      
      try {
        userToken = await AsyncStorage.getItem('userToken')
      }catch(e){
        console.log(e)
      }
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken})
    },1000)
  },[])

  if(loginState.isLoading){
    return (
      <View style={{flex:1,justifyContent:'center', alignItens:'center', backgroundColor: '#141414'}}>
        <Image source={require('./src/assets/img/logo2.png')} style={{width: '100%', height: '50%'}} />
      </View>
    )
  }

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors:{
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      color: '#333333',
      color_escura:AZUL_ESCURO_COLOR,
      color_media:AZUL_CLARO_COLOR,
      color_clara:CINZA_AZULADO_COLOR,
      color_clarinha:CINZA_COLOR
    }
  }
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors:{
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      color: '#ffffff',
      color_escura:CINZA_COLOR,
      color_media:CINZA_AZULADO_COLOR,
      color_clara:AZUL_CLARO_COLOR,
      color_clarinha:AZUL_ESCURO_COLOR
    }
  }

const theme  = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme

 return(
   <PaperProvider theme={theme}>
     <AuthContext.Provider value={authContext}>
      <NavigationContainer theme={theme}>
        {loginState.userToken !== null ? (
          <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} initialRouteName={'Home'} >
            <Drawer.Screen name='Home' component={MainTabScreen} />
            <Drawer.Screen name='Doacao' component={NewDoacao} />
          </Drawer.Navigator> 
        ): <RootStackScreen />}
      </NavigationContainer>
    </AuthContext.Provider>
   </PaperProvider>
 )
}


export default App;
