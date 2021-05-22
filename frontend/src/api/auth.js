import {API} from './index';

const url = '/api/users';

export const signIn = async (credential) => {
    return await API.post(`${url}/signIn`,credential);
}

export const signUp = async (authFormData) => {
    return await API.post(`${url}/signUp`,authFormData);
}
