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
  ScrollView,
  Picker
} from 'react-native';

import { useTheme } from '@react-navigation/native'; 
const PagarScreen = ({navigation}) =>{

  const { colors } = useTheme()
  const theme = useTheme()
 

  return(
    <ScrollView>
      <View  style={styles.container}>
        <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content' } />
      </View>
    </ScrollView>
  )
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
