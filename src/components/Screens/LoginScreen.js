import React from 'react';
import { AZUL_ESCURO_COLOR,AZUL_CLARO_COLOR,CINZA_AZULADO_COLOR,CINZA_COLOR} from '../globalStyles'
import {
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
    Text,
    View,
    Button,
    Platform,
    TextInput,
    StatusBar,
    Alert,
    Picker
} from 'react-native';

import * as Animatable from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'

import Users from '../../../model/User';

import { useTheme } from '@react-navigation/native';

import { AuthContext } from '../config/context';
import AsyncStorage from '@react-native-community/async-storage';
import { api } from '../config/axios';

const LoginScreen = ({navigation}) =>{

    const [categoria, setCategoria] = React.useState(1)
    const [data, setData] = React.useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true 
    })
    
    const { colors } = useTheme()
  return(
    <View style={styles.container}>
        
        <View style={styles.header}>
            <Text style={styles.text_header}>Bem-Vindo!</Text>
        </View>
        <Animatable.View animation={'fadeInUpBig'} style={[styles.footer, {backgroundColor: colors.background}]}>
        <Text style={[styles.text_footer,{color: colors.text}]}>Escolha a Categoria</Text>
            <View style={{marginVertical:20}}>
            <Picker 
                    selectedValue={categoria}
                    onValueChange={(itemValue) => setCategoria(itemValue)}
                >
                    <Picker.Item label="Doador" value={1} />
                    <Picker.Item label="Donatário" value={2} />
                    <Picker.Item label="Local" value={3} />
                </Picker>
                {
                    telaLogin(colors, data, setData,categoria, navigation)
                }
            </View>
            
        </Animatable.View>
    </View>
  )
}

const telaLogin = (colors, data,setData, categoria, navigation) => {

    const { signIn } = React.useContext(AuthContext)

    const loginHandle = async (username, password, categoria) => {

        let userEmail = ''
        let userPassword = ''
        let userName = ''
        let userId = 0
        let userToken = ''

    

        await api.post(`/`, {
            
            "credencial": username,
            "senha": password,
            "tpPessoa": categoria
            
        }).then(res => {
            
            signIn(res.data, categoria)
        }).catch(e=> {
            alert("Login Inválido")
        })
        
    }
    const textInpuChange = (e) => {
        e.length != 0 ? setData({ ...data, email:e,check_textInputChange: true }) : setData({ ...data, email:e,check_textInputChange: false })  
    }
    const handleValidPassword = (e) =>{
        if (e.length > 0){
            setData({
                ...data,
                isValidPassword: true
            })
        } else{
            setData({
                ...data,
                isValidPassword: false
            })
        }
    }
    const handleValidUser = (e) =>{
        /////// validar se existe
        if (e.length > 0){
            setData({
                ...data,
                isValidUser: true
            })
        } else{
            setData({
                ...data,
                isValidUser: true
            })
        }
        
    }
    

    

    const handlePasswordChange = (e) => {
        setData({ ...data, password:e })
    }
    const updateSecurityWord = () => {
        setData({ ...data, secureTextEntry: !data.secureTextEntry })
    }
    const forgotPassword = () => {
        alert('este recurso ainda nao esta disponivel')
    }
    return(
        <View>
            <Text style={[styles.text_footer,{color: colors.text}]}>{categoria == 1 || categoria == 2 ? 'Email' : 'CNPJ'}</Text>
            <View style={styles.action}>
                <FontAwesome name='user-o' color={colors.color_escura} size={20} />
                <TextInput onChangeText={(e) => textInpuChange(e)} onEndEditing={(e) => handleValidUser(e.nativeEvent.text)} placeholderTextColor={colors.color_clara} placeholder={`Informe o ${categoria === 1 || categoria === 2 ? 'Email' : 'CNPJ'}`} style={[styles.textInput,{color: colors.color_escura}]} autoCapitalize={'none'}/>
                {data.check_textInputChange ?<Animatable.View animation={'bounceIn'}><Feather name='check-circle' color='green' size={20} /></Animatable.View>: null}
                
            </View>
            {data.isValidUser ? null : errorMsg('Usuário Inválido')}
            <Text style={[styles.text_footer, {marginTop: 35, color: colors.color_escura}]}>Senha</Text>
            <View style={styles.action}>
                <Feather name='lock' color={colors.color_escura} size={20} />
                <TextInput onChangeText={(e) => handlePasswordChange(e)} onEndEditing={(e) => handleValidPassword(e.nativeEvent.text)} secureTextEntry={data.secureTextEntry} placeholderTextColor={colors.color_clara} placeholder={'Informe a Senha'} style={[styles.textInput,{color: colors.color_escura}]} autoCapitalize={'none'}/>
                <TouchableOpacity  onPress={() => {updateSecurityWord()}}>
                    {data.secureTextEntry? <Feather name='eye-off' color='grey' size={20}/> :<Feather name='eye' color='grey' size={20}/>}
                </TouchableOpacity>
                
            </View>
            {data.isValidPassword ? null : errorMsg('Senha Inválida')}
            <View style={styles.forgotPassword}>
            <TouchableOpacity onPress={() => forgotPassword()}>
                    <Text style={[styles.textforgotPassword, {color: colors.color_escura}]}>Esqueceu a Senha?</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.button}>
                <TouchableOpacity onPress={() => loginHandle(data.email, data.password, categoria)} style={styles.signIn}>
                    <LinearGradient colors={[AZUL_CLARO_COLOR,AZUL_ESCURO_COLOR]} style={styles.signIn} > 
                        <Text style={[styles.textSign, {color:CINZA_COLOR}]}>Entrar</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            <View style={styles.button}>
                <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.register}>
                    <LinearGradient colors={[AZUL_CLARO_COLOR,AZUL_ESCURO_COLOR]} style={styles.register} > 
                        <Text style={[styles.textRgister, {color:CINZA_COLOR}]}>Registar</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
        
    )
}

const errorMsg = (text) => {
    return(
        <Animatable.View animation={'fadeInLeft'} duration={500}>
            <Text style={styles.errorMsg}>{text}</Text>
        </Animatable.View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: AZUL_ESCURO_COLOR
    },
    header:{
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer:{
        flex:3,
        backgroundColor: CINZA_COLOR,
        borderTopLeftRadius:30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header:{
        color: CINZA_COLOR,
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer:{
        color: AZUL_ESCURO_COLOR,
        fontSize: 18
    },
    action:{
        flexDirection:'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#dbdbdb',
        paddingBottom: 5
    },
    textInput:{
        flex: 1,
        marginTop:Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10
    },
    button:{
        alignItems:'center',
        marginTop:20
    },
    signIn:{
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 10
    },
    register:{
        width: '70%',
        height: 40,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 10
    },
    textRgister:{
        fontSize:14
    },
    textSign:{
        fontSize:18,
        fontWeight:'bold'
    },
    forgotPassword:{
        marginTop: 10,
        marginBottom: 100
    },
    textforgotPassword:{
        color: AZUL_ESCURO_COLOR
    },
    errorMsg:{
        fontSize: 12,
        color: '#ee0000',
        marginHorizontal: 4
    }
});


export default LoginScreen;
