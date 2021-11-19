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
import { ScrollView } from 'react-native-gesture-handler';
import { api } from '../config/axios';

function RegisterScreen({navigation}) {
   
    
    const [data, setData] = React.useState({
        cpf: '',
        dataNascimento:'',
        razaoSocial : '',
        endereco:'',
        numero:'',
        complemento:'',
        telefone:'',
        email: '',
        nome:'',
        sobrenome:'',
        password: '',
        password2: '',
        check_textInputChange: false,
        secureTextEntry: true,
        secureTextEntry2: true,
        isValidUser: true,
        isValidPassword: true 
    })
    const handlecomplementoChange = (e) => {
        setData({ ...data, complemento:e })
    }
    const handletelefoneChange = (e) => {
        setData({ ...data, telefone:e })
    }
    const handlenumeroChange = (e) => {
        setData({ ...data, numero:e })
    }
    const handleenderecoChange = (e) => {
        setData({ ...data, endereco:e })
    }
    const handleRazaoSocialChange = (e) => {
        setData({ ...data, razaoSocial:e })
    }
    const handleDataNascimentoChange = (e) => {
        setData({ ...data, dataNascimento:e })
    }
    const handleCpfChange = (e) => {
        setData({ ...data, cpf:e })
    }
    
    const { colors } = useTheme()
    const { signIn } = React.useContext(AuthContext)

    const [categoria, setCategoria] = React.useState(1)
    const textInpuChange = (e) => {
        e.length != 0 ? setData({ ...data, email:e,check_textInputChange: true }) : setData({ ...data, email:e,check_textInputChange: false })  
    }
    const handlenomeChange = (e) => {
        setData({ ...data, nome:e })
    }
    const handlesobrenomeChange = (e) => {
        setData({ ...data, sobrenome:e })
    }
    const handlePasswordChange = (e) => {
        setData({ ...data, password:e })
    }
    const updateSecurityWord = () => {
        setData({ ...data, secureTextEntry: !data.secureTextEntry })
    }
    
    const cadastraUser = async () => {
        
        

        if(categoria === 1){
            api.post('/Cadastro/Doador',{
                "cpf": data.cpf,
                "nome": data.nome,
                "email": data.email,
                "telefone": data.telefone,
                "senha": data.password,
                "dataNascimento": String(data.dataNascimento).split('/').reverse().join('-')
            }).then(res => console.log(res))
        }else if(categoria === 2){
            api.post('/Cadastro/Donatario',{
                "cpf": data.cpf,
                "nome": data.nome,
                "email": data.email,
                "telefone": data.telefone,
                "senha": data.password,
                "dataNascimento": String(data.dataNascimento).split('/').reverse().join('-')
              }).then(res => console.log(res))
        }else{
            api.post('/Cadastro/Local',{
                "cpf": data.cpf,
                "razaoSocial": data.razaoSocial,
                "endereco": data.endereco,
                "numero": data.numero,
                "complemento": data.complemento,
                "telefone": data.telefone,
                "senha": data.password
            }).then(res => console.log(res))
        }

        navigation.pop()
    }

  return(
    <View style={styles.container}>
        
        <View style={styles.header}>
            <Text style={styles.text_header}>Bem-Vindo!</Text>
        </View>
        <Animatable.View animation={'fadeInUpBig'} style={[styles.footer, {backgroundColor: colors.background}]}>
            <ScrollView>

            <Text style={[styles.text_footer,{color: colors.text}]}>Categoria</Text>
            <View style={{marginVertical:20}}>
            <Picker 
                    selectedValue={categoria}
                    onValueChange={(itemValue) => setCategoria(itemValue)}
                >
                    <Picker.Item label="Doador" value={1} />
                    <Picker.Item label="Donatário" value={2} />
                    <Picker.Item label="Local" value={3} />
                </Picker>
                
            </View>
            
            {
                categoria != 3 ? (
                    <>
                        <Text style={[styles.text_footer,{marginTop: 4,color: colors.text}]}>CPF</Text>
                        <View style={styles.action}>
                            <FontAwesome name='user-o' color={colors.color_escura} size={20} />
                            <TextInput onChangeText={(e) => handleCpfChange(e)} maxLength={11} placeholderTextColor={colors.color_clara} placeholder={'Informe o CPF'} style={[styles.textInput,{color: colors.color_escura}]} autoCapitalize={'none'}/>
                            {data.check_textInputChange ?<Animatable.View animation={'bounceIn'}><Feather name='check-circle' color='green' size={20} /></Animatable.View>: null}
                            
                        </View>

                        <Text style={[styles.text_footer,{marginTop: 35,color: colors.text}]}>Nome</Text>
                        <View style={styles.action}>
                            <FontAwesome name='user-o' color={colors.color_escura} size={20} />
                            <TextInput onChangeText={(e) => handlenomeChange(e)}  placeholderTextColor={colors.color_clara} placeholder={'Informe o Nome'} style={[styles.textInput,{color: colors.color_escura}]} autoCapitalize={'none'}/>
                            {data.check_textInputChange ?<Animatable.View animation={'bounceIn'}><Feather name='check-circle' color='green' size={20} /></Animatable.View>: null}
                            
                        </View>

                        <Text style={[styles.text_footer,{marginTop: 35,color: colors.text}]}>Email</Text>
                        <View style={styles.action}>
                            <FontAwesome name='user-o' color={colors.color_escura} size={20} />
                            <TextInput onChangeText={(e) => textInpuChange(e)} placeholderTextColor={colors.color_clara} placeholder={'Informe o Email'} style={[styles.textInput,{color: colors.color_escura}]} autoCapitalize={'none'}/>
                            {data.check_textInputChange ?<Animatable.View animation={'bounceIn'}><Feather name='check-circle' color='green' size={20} /></Animatable.View>: null}
                            
                        </View>
                        <Text style={[styles.text_footer,{marginTop: 35,color: colors.text}]}>Telefone</Text>
                        <View style={styles.action}>
                            <FontAwesome name='user-o' color={colors.color_escura} size={20} />
                            <TextInput onChangeText={(e) => handletelefoneChange(e)} maxLength={10} placeholderTextColor={colors.color_clara} placeholder={'Informe o Telefone'} style={[styles.textInput,{color: colors.color_escura}]} autoCapitalize={'none'}/>
                            {data.check_textInputChange ?<Animatable.View animation={'bounceIn'}><Feather name='check-circle' color='green' size={20} /></Animatable.View>: null}
                            
                        </View>
                        {data.isValidUser ? null : errorMsg('Usuário Inválido')}
                        <Text style={[styles.text_footer, {marginTop: 35, color: colors.color_escura}]}>Senha</Text>
                        <View style={styles.action}>
                            <Feather name='lock' color={colors.color_escura} size={20} />
                            <TextInput onChangeText={(e) => handlePasswordChange(e)}  secureTextEntry={data.secureTextEntry} placeholderTextColor={colors.color_clara} placeholder={'Informe a Senha'} style={[styles.textInput,{color: colors.color_escura}]} autoCapitalize={'none'}/>
                            <TouchableOpacity  onPress={() => {updateSecurityWord()}}>
                                {data.secureTextEntry? <Feather name='eye-off' color='grey' size={20}/> :<Feather name='eye' color='grey' size={20}/>}
                            </TouchableOpacity>
                            
                        </View>
                        <Text style={[styles.text_footer,{marginTop: 35,color: colors.text}]}>Data de Nascimento</Text>
                        <View style={styles.action}>
                            <FontAwesome name='user-o' color={colors.color_escura} size={20} />
                            <TextInput onChangeText={(e) => handleDataNascimentoChange(e)} maxLength={10} placeholderTextColor={colors.color_clara} placeholder={'Informe o Nascimento'} style={[styles.textInput,{color: colors.color_escura}]} autoCapitalize={'none'}/>
                            {data.check_textInputChange ?<Animatable.View animation={'bounceIn'}><Feather name='check-circle' color='green' size={20} /></Animatable.View>: null}
                            
                        </View>
                    </>
                ):(
                    <>
                        <Text style={[styles.text_footer,{marginTop: 4,color: colors.text}]}>CPF</Text>
                        <View style={styles.action}>
                            <FontAwesome name='user-o' color={colors.color_escura} size={20} />
                            <TextInput onChangeText={(e) => handleCpfChange(e)} placeholderTextColor={colors.color_clara} maxLength={11} placeholder={'Informe o CPF'} style={[styles.textInput,{color: colors.color_escura}]} autoCapitalize={'none'}/>
                            {data.check_textInputChange ?<Animatable.View animation={'bounceIn'}><Feather name='check-circle' color='green' size={20} /></Animatable.View>: null}
                            
                        </View>

                        <Text style={[styles.text_footer,{marginTop: 35,color: colors.text}]}>Razao Social</Text>
                        <View style={styles.action}>
                            <FontAwesome name='user-o' color={colors.color_escura} size={20} />
                            <TextInput onChangeText={(e) => handleRazaoSocialChange(e)}  placeholderTextColor={colors.color_clara} placeholder={'Informe a Razao Social'} style={[styles.textInput,{color: colors.color_escura}]} autoCapitalize={'none'}/>
                            {data.check_textInputChange ?<Animatable.View animation={'bounceIn'}><Feather name='check-circle' color='green' size={20} /></Animatable.View>: null}
                            
                        </View>

                        <Text style={[styles.text_footer,{marginTop: 35,color: colors.text}]}>Endereco</Text>
                        <View style={styles.action}>
                            <FontAwesome name='user-o' color={colors.color_escura} size={20} />
                            <TextInput onChangeText={(e) => handleenderecoChange(e)} placeholderTextColor={colors.color_clara} placeholder={'Informe o Endereco'} style={[styles.textInput,{color: colors.color_escura}]} autoCapitalize={'none'}/>
                            {data.check_textInputChange ?<Animatable.View animation={'bounceIn'}><Feather name='check-circle' color='green' size={20} /></Animatable.View>: null}
                            
                        </View>
                        <Text style={[styles.text_footer,{marginTop: 35,color: colors.text}]}>Numero</Text>
                        <View style={styles.action}>
                            <FontAwesome name='user-o' color={colors.color_escura} size={20} />
                            <TextInput onChangeText={(e) => handlenumeroChange(e)} placeholderTextColor={colors.color_clara} placeholder={'Informe o Numero'} style={[styles.textInput,{color: colors.color_escura}]} autoCapitalize={'none'}/>
                            {data.check_textInputChange ?<Animatable.View animation={'bounceIn'}><Feather name='check-circle' color='green' size={20} /></Animatable.View>: null}
                            
                        </View>
                        <Text style={[styles.text_footer,{marginTop: 35,color: colors.text}]}>Complemento</Text>
                        <View style={styles.action}>
                            <FontAwesome name='user-o' color={colors.color_escura} size={20} />
                            <TextInput onChangeText={(e) => handlecomplementoChange(e)} placeholderTextColor={colors.color_clara} placeholder={'Informe o Complemento'} style={[styles.textInput,{color: colors.color_escura}]} autoCapitalize={'none'}/>
                            {data.check_textInputChange ?<Animatable.View animation={'bounceIn'}><Feather name='check-circle' color='green' size={20} /></Animatable.View>: null}
                            
                        </View>
                        <Text style={[styles.text_footer,{marginTop: 35,color: colors.text}]}>Telefone</Text>
                        <View style={styles.action}>
                            <FontAwesome name='user-o' color={colors.color_escura} size={20} />
                            <TextInput onChangeText={(e) => handletelefoneChange(e)} placeholderTextColor={colors.color_clara} maxLength={10} placeholder={'Informe o Telefone'} style={[styles.textInput,{color: colors.color_escura}]} autoCapitalize={'none'}/>
                            {data.check_textInputChange ?<Animatable.View animation={'bounceIn'}><Feather name='check-circle' color='green' size={20} /></Animatable.View>: null}
                            
                        </View>
                        {data.isValidUser ? null : errorMsg('Usuário Inválido')}
                        <Text style={[styles.text_footer, {marginTop: 35, color: colors.color_escura}]}>Senha</Text>
                        <View style={styles.action}>
                            <Feather name='lock' color={colors.color_escura} size={20} />
                            <TextInput onChangeText={(e) => handlePasswordChange(e)}  secureTextEntry={data.secureTextEntry} placeholderTextColor={colors.color_clara} placeholder={'Informe a Senha'} style={[styles.textInput,{color: colors.color_escura}]} autoCapitalize={'none'}/>
                            <TouchableOpacity  onPress={() => {updateSecurityWord()}}>
                                {data.secureTextEntry? <Feather name='eye-off' color='grey' size={20}/> :<Feather name='eye' color='grey' size={20}/>}
                            </TouchableOpacity>
                            
                        </View>
                    </>
                )

            }
            
            <View style={styles.button}>
                <TouchableOpacity onPress={() => cadastraUser()} style={styles.signIn}>
                    <LinearGradient colors={[AZUL_CLARO_COLOR,AZUL_ESCURO_COLOR]} style={styles.signIn} > 
                        <Text style={[styles.textSign, {color:CINZA_COLOR}]}>Cadastrar</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            </ScrollView>
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
