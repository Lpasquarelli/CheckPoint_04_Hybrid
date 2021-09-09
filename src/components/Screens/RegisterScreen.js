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
    Alert
} from 'react-native';


import * as Animatable from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'

import Users from '../../../model/User';

import { useTheme } from '@react-navigation/native';

import { AuthContext } from '../config/context';
import AsyncStorage from '@react-native-community/async-storage';
import User from '../../../model/User';

import {
    removeAll, 
    insertObject, 
    insertString, 
    read, 
    readAll
} from '../config/BD'

function RegisterScreen({navigation}) {
   
    
    const [data, setData] = React.useState({
        userName:'',
        email: '',
        password: '',
        password2: '',
        check_textInputChange: false,
        secureTextEntry: true,
        secureTextEntry2: true,
        isValidUser: true,
        isValidPassword: true 
    })
    
    
    const { colors } = useTheme()
    const { signIn } = React.useContext(AuthContext)

    const textInpuChangeName = (e) => {
        e.length != 0 ? setData({ ...data, userName:e,check_textInputChange: true }) : setData({ ...data, userName:e,check_textInputChange: false })  
    }
    const textInpuChange = (e) => {
        e.length != 0 ? setData({ ...data, email:e,check_textInputChange: true }) : setData({ ...data, email:e,check_textInputChange: false })  
    }
    const handlePasswordChange = (e) => {
        setData({ ...data, password:e })
    }
    const handlePassword2Change = (e) => {
        setData({ ...data, password2:e })
    }
    const updateSecurityWord = () => {
        setData({ ...data, secureTextEntry: !data.secureTextEntry })
    }
    const updateSecurityWord2 = () => {
        setData({ ...data, secureTextEntry2: !data.secureTextEntry2 })
    }
    const forgotPassword = () => {
        alert('\nUsuario: fiap \n Senha: fiap')
    }
    
    const loginHandle = (username, password) => {
        
        const foundUser = Users.filter( item => {
                return username == item.username && password == item.password
            })
        if(foundUser.length == 0) {
            Alert.alert('Login Inválido','Usuário ou Senha Inválidos!', [{text: 'OK'}])
            return
        }
        signIn(foundUser)
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
    const sequenceID = (props) => {
        let firstId = 0
        let maxId = 0

        props.map(item => {
            firstId = item.id;
            if(firstId > maxId)
                maxId = firstId
        })
        return maxId + 1;
    }
    const cadastraUser = async () => {
        
        if(data.email != '' && data.password != '' && data.password2 != ''){
            const userEmail = data.email
            const userPassword = data.password
            try {
                //Guarda o Valor dos usuarios

                let obj = []
                await removeAll('Usuarios', (error) =>{
                    console.log('apagado');
                })

                await read('Usuarios', (error2, value) => {
                    if(error2){
                        alert('Erro ao buscar usuario')
                        return
                    }
                    obj.push(JSON.parse(value))
                    console.log(obj[0]);
                })
                
                const newObj = {
                    id: 2,
                    email: data.email,
                    username: data.userName,
                    password: data.password,
                    userToken: `${data.userName + data.password}`
                }



                if(obj[0] == null){
                    obj.pop()
                    obj.push(newObj)
                }else{
                    obj.push(newObj)
                }

                await insertObject('Usuarios', obj,(error) => {
                    if(error){
                        alert('Nao foi possivel salvar')
                        return    
                    }

                    alert('Usuario cadastrado')
                    navigation.pop()
                })
                    
            }catch(e){
              console.log(e)
            }
            // console.log(User);
            
            
            
        }else{
            alert('Todos os campos sao obrigatorios')
        }
           
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

  return(
    <View style={styles.container}>
        
        <View style={styles.header}>
            <Text style={styles.text_header}>Bem-Vindo!</Text>
        </View>
        <Animatable.View animation={'fadeInUpBig'} style={[styles.footer, {backgroundColor: colors.background}]}>
            <Text style={[styles.text_footer,{color: colors.text}]}>Nome</Text>
            <View style={styles.action}>
                <FontAwesome name='user-o' color={colors.color_escura} size={20} />
                <TextInput onChangeText={(e) => textInpuChangeName(e)} placeholderTextColor={colors.color_clara} placeholder={'Informe o Nome'} style={[styles.textInput,{color: colors.color_escura}]} autoCapitalize={'none'}/>
                {data.check_textInputChange ?<Animatable.View animation={'bounceIn'}><Feather name='check-circle' color='green' size={20} /></Animatable.View>: null}
                
            </View>
            <Text style={[styles.text_footer,{color: colors.text}]}>Email</Text>
            <View style={styles.action}>
                <FontAwesome name='user-o' color={colors.color_escura} size={20} />
                <TextInput onChangeText={(e) => textInpuChange(e)} onEndEditing={(e) => handleValidUser(e.nativeEvent.text)} placeholderTextColor={colors.color_clara} placeholder={'Informe o Email'} style={[styles.textInput,{color: colors.color_escura}]} autoCapitalize={'none'}/>
                {data.check_textInputChange ?<Animatable.View animation={'bounceIn'}><Feather name='check-circle' color='green' size={20} /></Animatable.View>: null}
                
            </View>
            {data.isValidUser ? null : errorMsg('Usuário Inválido')}
            <Text style={[styles.text_footer, { color: colors.color_escura}]}>Senha</Text>
            <View style={styles.action}>
                <Feather name='lock' color={colors.color_escura} size={20} />
                <TextInput onChangeText={(e) => handlePasswordChange(e)} onEndEditing={(e) => handleValidPassword(e.nativeEvent.text)} secureTextEntry={data.secureTextEntry} placeholderTextColor={colors.color_clara} placeholder={'Informe a Senha'} style={[styles.textInput,{color: colors.color_escura}]} autoCapitalize={'none'}/>
                <TouchableOpacity  onPress={() => {updateSecurityWord()}}>
                    {data.secureTextEntry? <Feather name='eye-off' color='grey' size={20}/> :<Feather name='eye' color='grey' size={20}/>}
                </TouchableOpacity>
                
            </View>
            <Text style={[styles.text_footer, {color: colors.color_escura}]}>Confirma Senha</Text>
            <View style={styles.action}>
                <Feather name='lock' color={colors.color_escura} size={20} />
                <TextInput onChangeText={(e) => handlePassword2Change(e)} onEndEditing={(e) => handlePassword2Change(e.nativeEvent.text)} secureTextEntry={data.secureTextEntry2} placeholderTextColor={colors.color_clara} placeholder={'Confirme a Senha'} style={[styles.textInput,{color: colors.color_escura}]} autoCapitalize={'none'}/>
                <TouchableOpacity  onPress={() => {updateSecurityWord2()}}>
                    {data.secureTextEntry2? <Feather name='eye-off' color='grey' size={20}/> :<Feather name='eye' color='grey' size={20}/>}
                </TouchableOpacity>
                
            </View>
            {data.password2 != data.password && errorMsg('as senhas nao coincidem')}
            <View style={styles.button}>
                <TouchableOpacity onPress={() => cadastraUser()} style={styles.signIn}>
                    <LinearGradient colors={[AZUL_CLARO_COLOR,AZUL_ESCURO_COLOR]} style={styles.signIn} > 
                        <Text style={[styles.textSign, {color:CINZA_COLOR}]}>Cadastrar</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </Animatable.View>
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
        fontSize: 18,
        marginTop: 20
    },
    action:{
        flexDirection:'row',
        marginTop: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#dbdbdb',
        paddingBottom: 4,
        marginTop: 10
    },
    textInput:{
        flex: 1,
        marginTop:Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10
    },
    button:{
        alignItems:'center',
        marginTop:50
    },
    signIn:{
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 10
    },
    register:{
        width: '50%',
        height: 30,
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
        marginTop: 10
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


export default RegisterScreen
