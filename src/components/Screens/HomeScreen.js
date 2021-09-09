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

import {
  removeAll, 
  insertObject, 
  insertString, 
  read, 
  readAll
} from '../config/BD'
import { TextInput } from 'react-native-gesture-handler';

const HomeScreen = ({navigation}) => {
  
  const [editaUser, setEditaUser] = useState(false)
  const { colors } = useTheme()
  const theme = useTheme()
  const [user,setUser] = useState([{}])
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const [password2, setpassword2] = useState('')
  const [email, setemail] = useState('')

  useEffect(async () => {
    await read('Usuarios', (error2, value) => {
      if(error2){
          alert('Erro ao buscar usuario')
          return
      }
      const aux = JSON.parse(value);

      setUser(aux[0])
  })
  }, [])

  const edita = async () => {
    let aux = null
    console.log(email);
    console.log(password);
    console.log(password2);
    console.log(username);
    await read('Usuarios', (error2, value) => {
      if(error2){
          alert('Erro ao buscar usuario')
          return
      }
      aux = JSON.parse(value)

      aux[0].email = email
      aux[0].password = password
      aux[0].username = username
    })
    await removeAll('Usuarios', (error) =>{
      console.log('apagado');
    })
    await insertObject('Usuarios', aux,(error) => {
        if(error){
            alert('Nao foi possivel salvar')
            return    
        }
        alert('Usuario cadastrado')
    })

    await read('Usuarios', (error2, value) => {
      if(error2){
          alert('Erro ao buscar usuario')
          return
      }
      aux = JSON.parse(value)

      setEditaUser(false)
  })
  }

  return(
    <View style={styles.container}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content' } />
      <View style={{marginVertical: 30}}>
        <Text style={{fontSize: 20, marginTop: 10}}>Olá, {user.username}</Text>
      </View>
      <View style={{marginVertical: 30}}>
        <Text style={{fontSize: 18, marginTop: 10}}>a funcionalidade escolhida foi a de manipulação de usuarios, podendo ser criado no "registre-se", apagado ao dar log-off (Menu arrastando a direita) e editado por meio do botao de edição do usuario, ele é lido no login, tornando assim um CRUD Perfeito</Text>
      </View>
      <Button title={'Editar Usuario'} onPress={() => setEditaUser(!editaUser)}></Button>
      {editaUser ? (
        <View style={styles.wrapper}>
          <Text>Username:</Text>
          <TextInput style={styles.input} onChangeText={e => setusername(e)} value={username} autoCapitalize={'none'}/>
          <Text>Email:</Text>
          <TextInput style={styles.input} onChangeText={e => setemail(e)} value={email} autoCapitalize={'none'} />
          <Text>Password:</Text>
          <TextInput style={styles.input} onChangeText={e => setpassword(e)} value={password} autoCapitalize={'none'} />
          <Text>Confirm Password:</Text>
          <TextInput style={styles.input} onChangeText={e => setpassword2(e)} value={password2} autoCapitalize={'none'} />
          <Button title={'Editar'} onPress={() => edita()}></Button>
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 20
  },
  wrapper:{
    marginVertical: 20
  },
  input:{
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 20,
    fontSize: 18
  }
});

export default HomeScreen;
