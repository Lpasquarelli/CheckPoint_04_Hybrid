import React, { useState, useEffect } from 'react';
import { AZUL_ESCURO_COLOR,AZUL_CLARO_COLOR,CINZA_AZULADO_COLOR,CINZA_COLOR} from './src/components/globalStyles'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl
} from 'react-native';

import { useTheme } from '@react-navigation/native'; 
import axios from 'axios';
import Icon  from 'react-native-vector-icons/Feather';
import { api } from '../config/axios';
import  AsyncStorage  from '@react-native-community/async-storage';

const ReceberScreen = ({navigation}) =>{
  const { colors } = useTheme()

  const [obj, setObj] = useState([{}])
  const aux = [
    {
      valor: 10.50,
      data: '2021-10-02',
      tipoMovimentacao:'Saída',
      tipoMoeda: 1,    
    },
    {
      valor: 10.8,
      data: '2021-01-02',
      tipoMovimentacao:'Entrada',
      tipoMoeda: 2,    
    },
    {
      valor: 40.50,
      data: '2021-12-02',
      tipoMovimentacao:'Saída',
      tipoMoeda: 3,    
    },
    {
      valor: 40.50,
      data: '2021-12-02',
      tipoMovimentacao:'Saída',
      tipoMoeda: 4,    
    }
  ]

  useEffect(() => {
    buscaExtrato()
  }, [])

  const buscaExtrato = async () =>{

    let userId;

    userId = await AsyncStorage.getItem('userId')
    let contaID;

    
    await api.get('/Banco/'+userId).then(res=>{
      contaID = res.data.idConta;
    })
    console.log(contaID);
    await api.get('/Banco/Extrato/'+contaID).then(res=>{
      setObj(res.data)
      console.log(res.data);
    })

  }

  const [refreshing, setRefreshing] = React.useState(false);

const onRefresh = React.useCallback(() => { 
  setRefreshing(true);
  buscaExtrato()
  setRefreshing(false)
})

  return(
    <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }>
      <ExtratoPorMoeda obj={obj} tp={1}/>
      <ExtratoPorMoeda obj={obj} tp={2}/>
      <ExtratoPorMoeda obj={obj} tp={3}/>
      <ExtratoPorMoeda obj={obj} tp={4}/>
    </ScrollView>
  )
}

const ExtratoPorMoeda = ({obj, tp}) => {
  const { colors } = useTheme()
  const theme = useTheme()

  const [visible, setVisible] = useState(true)

  return(
    <View style={{padding:12, borderWidth:1, borderColor: "#f7f7f7", marginBottom:12}}>
      <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center'}}><Text style={{marginBottom:12, fontWeight:'bold', fontSize: 18,color: colors.text}}>
        {tp == 1 ? 'Bitcoin' : tp == 2 ? 'Reais': tp == 3? 'Dolar' : 'DogeCoin'}</Text>
        <TouchableOpacity onPress={() => setVisible(!visible)} style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
          <Icon name='more-horizontal' size={20} color={colors.text} />
        </TouchableOpacity>
      </View>
      {visible ? obj.filter(x => tp == x.tipoMoeda).map(item =>(
          <View style={{flexDirection:'row', borderColor:'#f7f7f7', justifyContent:'space-between', borderWidth:1, padding:8}}>
            <View style={{ justifyContent:'center'}}>
              <Text style={{color: colors.text}}>{ new Date(item.data).toLocaleDateString()}</Text>
            </View>
            <View style={{justifyContent:'center'}}>
              <Text style={{color: colors.text}}>Valor: {item.valor}</Text>
            </View>
          </View>
      )): null}
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding:8,

  }
});


export default ReceberScreen;
