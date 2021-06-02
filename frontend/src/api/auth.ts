import {API} from './index';
import {Credential, AuthFormData} from '../type';
import {User} from '../type';

const url = '/api/users';

export const signIn = async (credential:Credential) => {
    return await API.post<User>(`${url}/signIn`,credential);
};

export const signUp = async (authFormData:AuthFormData) => {
    return await API.post<User>(`${url}/signUp`,authFormData);
};
