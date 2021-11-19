import React, {useEffect} from 'react';
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
    Picker,
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


const NewDoacao = () => {

    const [locais, setLocais] = React.useState([{}])
    const [local, setLocal] = React.useState({})
    const [idUser, setIdUser] = React.useState('')

    const [data, setData] = React.useState({
        descricao: '',
        produto:'',
        quantidade : 0,
        unidadeMedida:'',
        diaEntrega:'',
        check_textInputChange: false,
        isValidUser: true,
    })
    const handleDescricaoChange = (e) => {
        setData({ ...data, descricao:e })
    }
    const handleProdutoChange = (e) => {
        setData({ ...data, produto:e })
    }
    const handleQuantidadeChange = (e) => {
        setData({ ...data, quantidade:e })
    }
    const handleUnidadeChange = (e) => {
        setData({ ...data, unidadeMedida:e })
    }
    const handleDiaEntregaChange = (e) => {
        setData({ ...data, diaEntrega:e })
    }
    
    const { colors } = useTheme()
    
    const cadastraUser = async () => {
        console.log(data);
        console.log(local);
        console.log(idUser);

        await api.post('/Cadastro/Doacao',{
            "descricao": data.descricao,
            "produto": data.produto,
            "quantidade": Number(data.quantidade),
            "unidadeMedida": data.unidadeMedida,
            "diaEntrega": String(data.diaEntrega).split('/').reverse().join('-'),
            "idLocal": local,
            "idDoador": idUser,
            "idDonatario": null
        }).then(res =>{
            console.log(res)
            alert('Doação Cadastrada Com sucesso!')
            setData({
                ...data,
                descricao: '',
                produto:'',
                quantidade : '',
                unidadeMedida:'',
                diaEntrega:'',
                check_textInputChange: false,
                isValidUser: true,
            })
        }).catch(e =>console.log(e))

    }
    useEffect(() => {
        callapi()
    }, [])

    const callapi = async () => {
        await api.get('/Local').then(res => {
            console.log(res.data);
            setLocais(res.data)
        }).catch(e => console.log(e))

        let idUser = ''

        idUser = await AsyncStorage.getItem('userId');
        setIdUser(idUser)
    }

  return(
    <View style={styles.container}>
        
        <View style={styles.header}>
            <Text style={styles.text_header}>Nova Doação</Text>
        </View>
        <Animatable.View animation={'fadeInUpBig'} style={[styles.footer, {backgroundColor: colors.background}]}>
            <ScrollView>
            
                <>
                    <Text style={[styles.text_footer,{marginTop: 4,color: colors.text}]}>Descrição</Text>
                    <View style={styles.action}>
                        <FontAwesome name='user-o' color={colors.color_escura} size={20} />
                        <TextInput onChangeText={(e) => handleDescricaoChange(e)} placeholderTextColor={colors.color_clara} maxLength={11} placeholder={'Informe a Descição'} style={[styles.textInput,{color: colors.color_escura}]} autoCapitalize={'none'}/>
                        {data.check_textInputChange ?<Animatable.View animation={'bounceIn'}><Feather name='check-circle' color='green' size={20} /></Animatable.View>: null}
                        
                    </View>

                    <Text style={[styles.text_footer,{marginTop: 35,color: colors.text}]}>Descrição do Produto</Text>
                    <View style={styles.action}>
                        <FontAwesome name='user-o' color={colors.color_escura} size={20} />
                        <TextInput onChangeText={(e) => handleProdutoChange(e)}  placeholderTextColor={colors.color_clara} placeholder={'Informe o Produto'} style={[styles.textInput,{color: colors.color_escura}]} autoCapitalize={'none'}/>
                        {data.check_textInputChange ?<Animatable.View animation={'bounceIn'}><Feather name='check-circle' color='green' size={20} /></Animatable.View>: null}
                        
                    </View>

                    <Text style={[styles.text_footer,{marginTop: 35,color: colors.text}]}>Quantidade</Text>
                    <View style={styles.action}>
                        <FontAwesome name='user-o' color={colors.color_escura} size={20} />
                        <TextInput onChangeText={(e) => handleQuantidadeChange(e)} keyboardType={'numeric'} placeholderTextColor={colors.color_clara} placeholder={'Informe a Quantidade'} style={[styles.textInput,{color: colors.color_escura}]} autoCapitalize={'none'}/>
                        {data.check_textInputChange ?<Animatable.View animation={'bounceIn'}><Feather name='check-circle' color='green' size={20} /></Animatable.View>: null}
                        
                    </View>
                    <Text style={[styles.text_footer,{marginTop: 35,color: colors.text}]}>Unidade de Medida</Text>
                    <View style={styles.action}>
                        <FontAwesome name='user-o' color={colors.color_escura} size={20} />
                        <TextInput onChangeText={(e) => handleUnidadeChange(e)} placeholderTextColor={colors.color_clara} placeholder={'Informea Unidade de Medida'} style={[styles.textInput,{color: colors.color_escura}]} autoCapitalize={'none'}/>
                        {data.check_textInputChange ?<Animatable.View animation={'bounceIn'}><Feather name='check-circle' color='green' size={20} /></Animatable.View>: null}
                        
                    </View>
                    <Text style={[styles.text_footer,{marginTop: 35,color: colors.text}]}>Dia De Entrega</Text>
                    <View style={styles.action}>
                        <FontAwesome name='user-o' color={colors.color_escura} size={20} />
                        <TextInput onChangeText={(e) => handleDiaEntregaChange(e)} placeholderTextColor={colors.color_clara} placeholder={'Informe a Data de Entrega'} style={[styles.textInput,{color: colors.color_escura}]} autoCapitalize={'none'}/>
                        {data.check_textInputChange ?<Animatable.View animation={'bounceIn'}><Feather name='check-circle' color='green' size={20} /></Animatable.View>: null}
                        
                    </View>
                    <View style={{marginBottom:20}}>
                    <Text style={[styles.text_footer,{marginTop: 30,color: colors.text}]}>Local De Entrega</Text>
                        <Picker selectedValue={local} onValueChange={(itemValue) => {
                            setLocal(itemValue)
                            }} >
                            <Picker.Item label={'Selecione'} value={null} />
                            {
                            locais.map((item,index) =>(
                                <Picker.Item key={index} label={`${item.endereco} - ${item.numero}`} value={item.id} />
                                
                            ))}
                        </Picker>
                        
                    </View>
                    
                </>
            
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
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        marginVertical:30,
        paddingBottom: 20
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
        fontSize: 20
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


export default NewDoacao