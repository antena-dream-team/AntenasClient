import axios from'axios'
import store from '../store/index'

const isProduction = process.env.NODE_ENV === 'production';
const http = axios.create({
    baseURL: isProduction ? process.env.PROD_API : process.env.LOCAL_API,
    headers: {
        'Accept': 'application/json',
        'Content': 'application/json',
    }
})

axios.interceptors.request.use(config => { 
    const token = store.state.token;
    if (token) {
        config.headers.Authorization = `Baearer ${token}`;
    }

    return config; 
}, Promise.reject);

export default http;