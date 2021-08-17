import React from 'react'

import { View, StyleSheet}  from 'react-native'
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch,
    useTheme
} from 'react-native-paper'

import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import { DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer'


import { AuthContext } from '../config/context'



export function DrawerContent(props){
    
    const paperTheme = useTheme()
    
    const { signOut,toggleTheme } = React.useContext(AuthContext)

    const [user,setUser] = React.useState('HighLine')

    const f = async () => {
        try{
            let user;
            user = await AsyncStorage.getItem('user')
            setUser(user)

        }catch(e) { 
            console.log(e);
        }
    }


    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <Drawer.Section style={styles.drawerSection}>
                        <View style={styles.userInfoSection}>
                            <View style={{flexDirection:'row', marginTop: 15}}>
                                <Avatar.Image source={require('../../assets/img/logo.jpg')} style={{backgroundColor: paperTheme.dark ? 'transparent' : '#b5b5b5', margin: 2}} size={65} />
                                <View style={{marginLeft: 15, flexDirection: 'column'}}> 
                                    <Title style={styles.title}>{user}</Title>
                                    <Caption style={styles.caption}>Faculdade de Informatica e Administração Paulista</Caption>
                                </View>
                            </View>
                            
                        </View>

                    </Drawer.Section>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem icon={({color, size}) => (
                                <Icon name='account-cash-outline' color={color} size={size} />
                            )} label='Tela 2' onPress={()=> {props.navigation.navigate('Teladois')}}/>
                        <DrawerItem icon={({color, size}) => (
                                <MaterialIcon name='payments' color={color} size={size} />
                            )} label='Tela 3' onPress={()=> {props.navigation.navigate('Telatres')}}/>
                    </Drawer.Section>
                    <Drawer.Section title={'Preferencies'}>
                        <TouchableRipple onPress={() => toggleTheme()}>
                            <View style={styles.preference} pointerEvents={'none'}>
                                <Text>Dark Mode</Text>
                                <Switch value={paperTheme.dark}/>
                            </View>

                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={StyleSheet.bottomDrawerSection}>
                <DrawerItem icon={({color, size}) => (
                    <Icon name='exit-to-app' color={color} size={size} />
                )} label='Sign Out' onPress={()=> {signOut()}}/>
            </Drawer.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1
    },
    userInfoSection:{
        paddingLeft:20
    },
    title:{
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        width: 170
    },
    row:{
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    section:{
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15
    },
    paragraph:{
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection:{
        marginTop: 15
    },
    bottomDrawerSection:{
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16
    }
});