import React, { useState,useEffect } from 'react';
import { AZUL_ESCURO_COLOR,AZUL_CLARO_COLOR,CINZA_AZULADO_COLOR,CINZA_COLOR} from './src/components/globalStyles'
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Button,
  StatusBar
} from 'react-native';

import { useTheme } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-community/async-storage';

const HomeScreen = ({navigation}) => {
  

  const apagarDados = async () => {
    try{
      await AsyncStorage.removeItem('userName')
      await AsyncStorage.removeItem('userEmail')
      await AsyncStorage.removeItem('userPassword')
      alert('Dados Apagados')
    }catch(e){
      console.log(e);
    }
  }

  useEffect(() => {
    findUser()
  }, [])

  const findUser = async () => {
    let user = ''
    try{
      user = await AsyncStorage.getItem('userName')
      setUser(user)
    }catch(e){
      console.log(e)
    }
  }

  const [user, setUser] = useState('')
  const { colors } = useTheme()
  const theme = useTheme()

  return(
    <View style={styles.container}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content' } />
      <Text style={{color:colors.text, }}> Bem-Vindo {user}</Text>
      <Text style={{color:colors.text}}> Deslize a tela para esquerda para abrir o menu </Text>
      <View style={{marginTop: 100}}>
        <Button title={'Apagar Dados'} onPress={() => apagarDados()} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems:'center',
    justifyContent:'center'
  }
});

export default HomeScreen;
