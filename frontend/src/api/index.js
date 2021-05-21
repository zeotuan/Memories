import axios from 'axios';
import {baseUrl} from '../constant';


export * as postApi from './post';
export * as authApi from './auth';

export const API = axios.create({baseURL:baseUrl});
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
});