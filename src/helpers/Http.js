import axios from'axios'
import store from '../store/index'

const isProduction = process.env.NODE_ENV === 'production';
const http = axios.create({
    baseURL: 'http://localhost:8080/dev',
    headers: {
        'Accept': 'application/json',
        'Content': 'application/json',
    }
})

http.interceptors.request.use(config => { 
    const token = store.state.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config; 
}, Promise.reject);

export default http;