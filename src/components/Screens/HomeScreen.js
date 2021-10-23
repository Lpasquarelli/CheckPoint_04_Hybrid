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
import { color } from 'react-native-reanimated';

import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const HomeScreen = ({navigation}) => {
  

  const [user,setUser] = React.useState('')
  const [userID,setUserID] = React.useState('')

  useEffect(() => {
    f()
}, [])

const f = async () => {
    try{
        let user;
        let userId;
        user = await AsyncStorage.getItem('userName')
        userId = await AsyncStorage.getItem('userId')

        setUserID(userId)
        setUser(user)

    }catch(e) { 
        console.log(e);
    }
}

  const { colors } = useTheme()
  const theme = useTheme()

  return(
    <>
      <View style={{flexDirection:'row', padding: 12, alignItems: 'flex-end'}}>
        <Text style={{fontSize: 16, marginRight: 4, fontFamily:'OpenSans', color: colors.text}}>Olá,</Text>
        <Text style={{fontSize: 20, fontFamily:'OpenSans', color: colors.text}}>{user}</Text>
      </View>
      <View style={styles.container}>
        <Saldos moeda={'Bitcoin'} sigla={<MaterialIcons name={'currency-btc'} size={16} color={colors.text}/>} saldo={2.50} prefixo={<MaterialIcons name={'currency-btc'} size={16} color={colors.text}/>}/>
        <Saldos moeda={'Reais'} sigla={<MaterialIcons name={'currency-brl'} size={16} color={colors.text}/>} saldo={2.50} prefixo={<MaterialIcons name={'currency-brl'} size={16} color={colors.text}/>}/>
        <Saldos moeda={'Dolar'} sigla={<MaterialIcons name={'currency-usd'} size={16} color={colors.text}/>} saldo={2.50} prefixo={<MaterialIcons name={'currency-usd'} size={16} color={colors.text}/>}/>
        <Saldos moeda={'Dogecoin'} sigla={'D'} saldo={2.50} prefixo={'D'}/>
      </View>

    </>

  )
}

const Saldos = ({moeda, sigla, saldo, prefixo}) =>{
  useEffect(() => {

  }, [])

  const [user, setUser] = useState('')
  const { colors } = useTheme()
  const theme = useTheme()

  return(
    <View style={[styles.containerSaldos,{backgroundColor: theme.dark?colors.card : '#e6e6e6'}]}>
      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <Text style={{fontSize: 16, color: colors.text}}>{moeda}</Text>        
        <Text style={{fontSize: 12,color: colors.text}}>{sigla}</Text>
      </View>
      <View style={{flexDirection:'row', alignItems: 'flex-end', justifyContent:'center', marginTop: 20}}>
        <Text style={{color: colors.text}}>{prefixo}</Text>
        <Text style={{fontSize:30,color: colors.text}}>{Number(saldo).toFixed(2)}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems:'center',
    justifyContent:'flex-start',
    padding:12
  },
  containerSaldos:{
    backgroundColor:'#e6e6e6',
    width:'100%',
    padding:12,
    justifyContent:'center',
    borderRadius: 4,
    marginVertical: 5
  }
});

export default HomeScreen;
