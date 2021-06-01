import Action from './action';
import {authApi} from '../../api';
import {Credential, AuthFormData} from '../../type';
import {SET_ERROR_NOTIFICATION, SET_SUCCESS_NOTIFICATION} from '../Notification/actionCreator';

export type authDispath = React.Dispatch<Action>;

export const SignIn = (credential:Credential, history:any) => {
    return async (dispatch:authDispath) => {
        try {
            const {data} = await authApi.signIn(credential);
            dispatch({
                type:"AUTH",
                payload:data 
            });
            history.push("/");
        } catch (error) {
            console.log(error);
        }
        
    };
};

export const SignUp = (authFormData:AuthFormData, history:any) => {
    return async (dispatch:authDispath) => {
        try {
            const signedUpUser = await authApi.signUp(authFormData);
            dispatch({
                type:"SIGNUP",
                payload:signedUpUser
            });
            history.push("/auth");
        } catch (error) {
            console.log(error);
        }
    };
};