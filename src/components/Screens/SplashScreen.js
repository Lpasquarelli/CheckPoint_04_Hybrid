import React from 'react';
import { AZUL_ESCURO_COLOR,AZUL_CLARO_COLOR,CINZA_AZULADO_COLOR,CINZA_COLOR} from '../globalStyles'
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { useTheme } from '@react-navigation/native'; 

const SplashScreen = ({navigation}) =>{

    const { colors } = useTheme()

  return(
    <View style={styles.container}>
        <View style={ styles.header} >
            <Animatable.Image animation={'bounceIn'} duration={1500} source={require('../../assets/img/logo2.png')} style={styles.logo} resizeMode='stretch'/>
        </View>
        <Animatable.View style={[ styles.footer, {backgroundColor: colors.background}]} animation={'fadeInUpBig'} >
            <Text style={[styles.title, {color: colors.text}]}>Entre com sua Conta</Text>
            <Text style={styles.text}>ou Registre-se</Text>
            <View style={styles.button}>
                <TouchableOpacity onPress={() => {navigation.navigate('LoginScreen')}}>
                    <LinearGradient colors={[AZUL_CLARO_COLOR, AZUL_ESCURO_COLOR]} style={styles.signIn} >
                        <Text style={styles.textSign}>Começar</Text>
                        <MaterialIcons  name='navigate-next' color={CINZA_AZULADO_COLOR} size={20}/>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </Animatable.View>
    </View>
  )
}

const {height} = Dimensions.get("screen")
const height_logo = height * 0.6;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: AZUL_ESCURO_COLOR,
    },
    header:{
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer:{
        flex: 1,
        backgroundColor: CINZA_COLOR,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30,
    },
    logo:{
        width: 700,
        height: height_logo,
    },
    title:{
        color: AZUL_CLARO_COLOR,
        fontSize: 30,
        fontWeight: 'bold' 
    },
    text:{
        color:'grey',
        marginTop: 5 
    },
    button:{
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn:{
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign:{
        fontSize: 16,
        color: '#fff',
        fontWeight: '200'
    }
});


export default SplashScreen;
