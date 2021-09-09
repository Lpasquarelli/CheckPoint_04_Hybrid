import AsyncStorage from "@react-native-community/async-storage";

const insertString = async (key, value, callback = null) => {
    if(typeof value != 'string'){
        throw new Error('Tipo de dados nao é uma string')
    }

    try{
        await AsyncStorage.setItem(key, value, callback)
    }catch(e){
        throw new Error('Não foi possivel inserir os dados no OBJ')
    }
}

const insertObject = async (key, value, callback = null) => {
    try{

        const objAux = JSON.stringify(value)

        await AsyncStorage.setItem(key,objAux, callback)
    }catch(e){
        throw new Error('Erro ao inserir o obj na memoria')
    }
}

const read = async (key, callback = null) =>{
    try{
        await AsyncStorage.getItem(key, callback)
    }catch(e){
        throw new Error('Nao foi possivel localizar o OBJ')
    }
}
const readAll = async (callback = null) =>{
    try{
        await AsyncStorage.getAllKeys(callback)
    }catch(e){
        throw new Error('Nao foi possivel localizar o OBJ')
    }
}

const removeAll = async (key,callback = null) =>{
    try{
        await AsyncStorage.removeItem(key,callback)
    }catch(e){
        throw new Error('Nao foi possivel localizar o OBJ')
    }
}

export { removeAll }
export { insertObject }
export { insertString }
export { read }
export { readAll }