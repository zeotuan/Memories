import axios from 'axios';
import {baseUrl} from '../constant';
import getUserFromStorage from '../utils/userExtractor';

export * as postApi from './post';
export * as authApi from './auth';

export const API = axios.create({baseURL:baseUrl});
API.interceptors.request.use((req) => {
    const authItem =  getUserFromStorage();
    if(authItem){
        req.headers.authorization = `Bearer ${authItem.token}`;
    }
    return req;
});


// API.interceptors.request.use(request => {
//     console.log('Starting Request', JSON.stringify(request, null, 2))
//     return request
// })