import axios from 'axios'

export const api = axios.create({
    baseURL:'http://192.168.5.172:5000/Login/',
    timeout: 40000,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
})

