import axios from 'axios';
import {baseUrl} from '../constant';


export * as postApi from './post';
export * as authApi from './auth';

export const API = axios.create({baseURL:baseUrl});
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
});


// API.interceptors.request.use(request => {
//     console.log('Starting Request', JSON.stringify(request, null, 2))
//     return request
// })