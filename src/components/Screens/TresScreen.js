import React from 'react';
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


const ReceberScreen = ({navigation}) =>{

  const { colors } = useTheme()
  const theme = useTheme()

  return(
    <View style={styles.container}>
    <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content' } />
      <Text style={{color:colors.text}}> Tres Screen</Text>
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


export default ReceberScreen;
