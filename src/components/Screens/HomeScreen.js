import React, { useState,useEffect } from 'react';
import { AZUL_ESCURO_COLOR,AZUL_CLARO_COLOR,CINZA_AZULADO_COLOR,CINZA_COLOR} from '../globalStyles'
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Button,
  StatusBar,
  RefreshControl,
  TouchableOpacity
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import { useTheme } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-community/async-storage';
import { color } from 'react-native-reanimated';

import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { api } from '../config/axios';
import { ScrollView } from 'react-native-gesture-handler';

const HomeScreen = ({navigation}) => {
  
  const [doacoes, setDoacoes] = React.useState([{}])
  const [user,setUser] = React.useState('')
  const [userID,setUserID] = React.useState('')
  const [categoria,setCategoria] = React.useState('')

  useEffect(() => {
    f()
}, [])

const f = async () => {
    try{
        let user;
        let userId;
        let catUser;
        user = await AsyncStorage.getItem('userName')
        userId = await AsyncStorage.getItem('userId')
        catUser = await AsyncStorage.getItem('categoria')


        await api.get(`/Doacoes?tpPessoa=${catUser}&id=${userId}`).then(res => {
          setDoacoes(res.data)
          console.log(res.data);
        }).catch(e => console.log(e))

        setUserID(userId)
        setUser(user)
        setCategoria(catUser)

    }catch(e) { 
        console.log(e);
    }
}

const [refreshing, setRefreshing] = React.useState(false);

const onRefresh = React.useCallback(() => { 
  setRefreshing(true);
  f()
  //
  setRefreshing(false)
})

const realizaDoacao = async () => {
  navigation.navigate('Doacao')
}

  const { colors } = useTheme()
  const theme = useTheme()

  const reserva = async (item) => {
    console.log(item);

    
    await api.post(`/Agenda/${item.id}/${userID}`).then(res=>{
      alert('Doação Agendada!')
      setDoacoes(doacoes.filter(x => x.id != item.id));

    }).catch(e => console.log(e))
  }

  const aprova = async (item) => {
    console.log(item);

    
    await api.post('/Aprova/idDoacao='+item.id).then(res=>{
      alert('Doação Aprovada!')
      setDoacoes(doacoes.filter(x => x.id != item.id));

    }).catch(e => console.log(e))
  }

  return(
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }>
      <View style={{flexDirection:'row', padding: 12, alignItems: 'flex-end'}}>
        <Text style={{fontSize: 16, marginRight: 4, fontFamily:'OpenSans', color: colors.text}}>Olá,</Text>
        <Text style={{fontSize: 20, fontFamily:'OpenSans', color: colors.text}}>{user}</Text>
      </View>
      <View style={styles.container}>
        {
          categoria === '1' && (
            <View style={{flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
              <TouchableOpacity onPress={() => realizaDoacao(userID)} style={{marginVertical:12, borderRadius:4 , borderWidth:1, borderColor:'green', padding: 12}}><Text style={{color:'green'}}>Realizar Doação</Text></TouchableOpacity>
              <Text style={{marginVertical: 8, fontSize: 16, fontWeight: 'bold'}}>Suas Doacoes:</Text>
            </View>
          )
        }
        {
          categoria === '2' && (
            <View style={{flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
              <Text style={{marginVertical: 8, fontSize: 16, fontWeight: 'bold'}}>Doações Disponiveis:</Text>
            </View>
          )
        }
        {
          doacoes.length > 0? doacoes.filter(x => x.idDonatario == null).map((item, index) =>(
            <View style={{marginVertical: 4, borderColor:AZUL_ESCURO_COLOR, borderWidth:1, padding: 4, borderRadius:4,flexDirection:'row'}}>
              <View style={{ width:'90%'}}>
                <Text>Codigo: {item.id}</Text>
                <Text>Descrição: {item.descricao}</Text>
                <Text>Data de Entrega: {new Date(item.diaEntrega).toLocaleDateString('en-GB',{day: '2-digit', month: '2-digit', year:'2-digit'})}</Text>
                <Text>Produto: {item.produto}</Text>
                <Text>Quantidade: {item.quantidade}</Text>
              </View>
              {
                categoria === '3' &&(
                  <View style={{justifyContent:'center', alignItems:'center'}}>
                    <TouchableOpacity onPress={() => aprova(item)}><AntDesign name={'check'} size={20} /></TouchableOpacity>
                  </View>
                )
              }
              {
                categoria === '2' &&(
                  <View style={{justifyContent:'center', alignItems:'center'}}>
                    <TouchableOpacity onPress={() => reserva(item)}><AntDesign name={'check'} size={20} /></TouchableOpacity>
                  </View>
                )
              }
            </View>
          )) : null
        }

        {
          categoria === '2' && (
            <View style={{flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
              <Text style={{marginVertical: 8, fontSize: 16, fontWeight: 'bold'}}>Doações Agendadas:</Text>
            </View>
          )
        }
        {
          doacoes.length > 0? doacoes.filter(x => x.idDonatario == userID).map((item, index) =>(
            <View style={{marginVertical: 4, borderColor:AZUL_ESCURO_COLOR, borderWidth:1, padding: 4, borderRadius:4,flexDirection:'row'}}>
              <View style={{ width:'90%'}}>
                <Text>Codigo: {item.id}</Text>
                <Text>Descrição: {item.descricao}</Text>
                <Text>Data de Entrega: {new Date(item.diaEntrega).toLocaleDateString('en-GB',{day: '2-digit', month: '2-digit', year:'2-digit'})}</Text>
                <Text>Produto: {item.produto}</Text>
                <Text>Quantidade: {item.quantidade}</Text>
              </View>
            </View>
          )) : null
        }
      </View>

    </ScrollView>

  )
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
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
