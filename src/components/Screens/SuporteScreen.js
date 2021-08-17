import React from 'react';
import { AZUL_ESCURO_COLOR,AZUL_CLARO_COLOR,CINZA_AZULADO_COLOR,CINZA_COLOR} from './src/components/globalStyles'
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Button
} from 'react-native';



const SuporteScreen = ({navigation}) =>{
  return(
    <View style={styles.container}>
      <Text> Suporte Screen</Text>
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


export default SuporteScreen;
