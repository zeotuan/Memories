import {API} from './index';
import {Credential, AuthFormData} from '../type';

const url = '/api/users';

export const signIn = async (credential:Credential) => {
    return await API.post(`${url}/signIn`,credential);
};

export const signUp = async (authFormData:AuthFormData) => {
    return await API.post(`${url}/signUp`,authFormData);
};
