import React, { useEffect, useState } from 'react';
import { AZUL_ESCURO_COLOR,AZUL_CLARO_COLOR,CINZA_AZULADO_COLOR,CINZA_COLOR} from '../globalStyles'
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Button,
  StatusBar,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { useTheme } from '@react-navigation/native'; 
import { colors } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
import { TextInput } from 'react-native-paper';
import { VERMELHO_COLOR } from '../globalStyles';

const PagarScreen = ({navigation}) =>{

  const { colors } = useTheme()
  const theme = useTheme()
 

  return(
    <ScrollView>
      <View  style={styles.container}>
        <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content' } />
        {/* <Recentes /> */}
        <NovaTransferencia />
      </View>
    </ScrollView>
  )
}

const validaTransferencia = () => {

  return true
}

const NovaTransferencia = () => {

  const [contaDestino, setContaDestino] = useState()
  const [agenciaDestino, setAgenciaDestino] = useState()
  const [valor, setValor] = useState()
  const [senha, setSenha] = useState()

  const  Transferencia = async () => {


    if(contaDestino == null){
      alert('informe a conta destino')
      return
    }
    if(agenciaDestino == null){
      alert('informe a agencia destino')
      return
    }
    if(valor == null){
      alert('informe o valor da transferencia')
      return
    }
    if(senha == null){
      alert('informe a senha')
      return
    }

    if(await validaTransferencia){
      alert(`Transferencia de ${valor} realizada para conta ${contaDestino} e agencia ${agenciaDestino}`)

      setContaDestino(null)
      setAgenciaDestino(null)
      setValor(null)
      setSenha(null)
    }

    

    console.log(contaDestino)
    console.log(agenciaDestino)
    console.log(valor)
    console.log(senha)
  }

  const handleContaDestino = (e) =>{
    setContaDestino(e)
  }
  const handleAgenciaDestino = (e) => {
    setAgenciaDestino(e)
  }
  const handleValor = (e) => {
    setValor(e)
  }
  const handleSenha = (e) => {
    setSenha(e)
  }
  const { colors } = useTheme()
  const theme = useTheme()

  return(
    <View style={{backgroundColor: theme.dark?colors.card : '#e6e6e6', width:400, marginTop: 12, borderRadius:4}}>
      <View style={{justifyContent:'center', alignItems:'center'}}>
        <Text style={{marginVertical:4, fontWeight:'bold', fontSize: 18 , color: colors.text}}>Nova</Text>
      </View>
      <View>
        <View style={{padding:12}}>
          <Text style={{color: colors.text}}>Conta Destino:</Text>
          <TextInput style={{height: 40}} value={contaDestino} onChangeText={(e) => handleContaDestino(e)} maxLength={12} keyboardType = 'numeric' />
        </View>
        <View style={{padding:12}}>
          <Text style={{color: colors.text}}>Agencia Destino:</Text>
          <TextInput style={{height: 40}} value={agenciaDestino} onChangeText={(e) => handleAgenciaDestino(e)}  maxLength={12} keyboardType = 'numeric' />
        </View>
        <View style={{padding:12}}>
          <Text style={{color: colors.text}}>Valor:</Text>
          <TextInput style={{height: 40}} value={valor} onChangeText={(e) => handleValor(e)} maxLength={20} keyboardType = 'numeric' />
        </View>
        <View style={{padding:12}}>
          <Text style={{color: colors.text}}>Senha:</Text>
          <TextInput style={{height: 40}} value={senha} onChangeText={(e) => handleSenha(e)} maxLength={4} keyboardType = 'numeric' />
        </View>
        <View style={{alignItems:'center', marginVertical: 12}}>
          <TouchableOpacity onPress={() => Transferencia() } style={[styles.transferir,{backgroundColor: AZUL_ESCURO_COLOR}]}>
            <Text style={{color: colors.text}}>Transferir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const Recentes = () =>{
 const [obj, setObj] = useState([{}])
  const objAux = [
    {
      nome:'Leonardo',
      contaID:1,
      numeroConta:'12345',
      agenciaID:1,
      numeroAgencia:'12345',
      valor: 1.5,
      moeda:'Bitcoin',
      dataTransf:'2021-10-01'
    },
    {
      nome:'Leonardo9',
      contaID:4,
      numeroConta:'12345',
      agenciaID:1,
      numeroAgencia:'12345',
      valor: 1.5,
      moeda:'Bitcoin',
      dataTransf:'2021-10-01'
    },
    {
      nome:'Leonard1o',
      contaID:2,
      numeroConta:'12345',
      agenciaID:1,
      numeroAgencia:'12345',
      valor: 1.5,
      moeda:'Bitcoin',
      dataTransf:'2021-10-01'
    }
  ]
  const { colors } = useTheme()
  const theme = useTheme()
  useEffect(() => {
   setObj(objAux)
  }, [])

  if(obj.length > 0){
    return(
      <React.Fragment>
        <View style={{backgroundColor: theme.dark?colors.card : '#e6e6e6', padding:12, width: 400, borderRadius:4}}>
          <View style={{justifyContent:'center', alignItems:'center'}}><Text style={{marginVertical:4, fontWeight:'bold', fontSize: 18,color: colors.text}}>Recentes</Text></View>
          {obj.map(item =>(
    
            <View style={{flexDirection:'row',justifyContent:'space-between', borderWidth:1, borderColor:colors.text, padding: 4, marginVertical: 2, borderRadius:6}}>
              <View style={{width:200}}>
                <Text style={{color: colors.text}}>Benfeciario: {item.nome}</Text>
                <Text style={{color: colors.text}}>Conta: {item.numeroConta}</Text>
                <Text style={{color: colors.text}}>Agencia: {item.numeroAgencia}</Text>
              </View>
              <View>
                <Text style={{color: colors.text}}>Valor:{Number(item.valor).toFixed(2)}</Text>
                <Text style={{color: colors.text}}>Data: {new Date(item.dataTransf).toLocaleDateString()}</Text>
              </View>
              <TouchableOpacity onPress={() => {
                const novo = obj.filter(x=> item != x)
                setObj(novo)
              }} style={{ justifyContent: 'center'}}><Icon name={'remove'} size={16} color={'#ee0000'}></Icon></TouchableOpacity>
            </View>
          ))}
            </View>
        </React.Fragment>
        )}else{
    return null
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems:'center',
    padding:12
  },
  transferir:{
    width: '70%',
    height: 40,
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 10
},

});


export default PagarScreen;
