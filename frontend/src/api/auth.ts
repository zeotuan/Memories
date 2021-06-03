import {API} from './index';
import {NormalCredential, AuthFormData} from '../type';
import {User} from '../type';

const url = '/api/users';

export const signIn = async (credential:NormalCredential) => {
    return await API.post<User>(`${url}/signIn`,credential);
};

export const signUp = async (authFormData:AuthFormData) => {
    return await API.post<User>(`${url}/signUp`,authFormData);
};

export const signInWithGoogle = async (idToken:string) => {
    return await API.post<User>(`${url}/signInWithGoogle`,{idToken});
};
