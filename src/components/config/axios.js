import axios from 'axios'

export const api = axios.create({
    baseURL:'http://18.117.190.114:8081/',
    timeout: 40000,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
})

