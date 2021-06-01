import {Dispatch} from 'react';
import Action from './action';
import {authApi} from '../../api';
import {Credential, AuthFormData} from '../../type';
import {SET_ERROR_NOTIFICATION, SET_SUCCESS_NOTIFICATION} from '../Notification/actionCreator';

export type authDispath = Dispatch<Action|((dispatch:Dispatch<any>)=>void)>;

export const SignIn = (credential:Credential, history:any) => {
    return async (dispatch:authDispath) => {
        try {
            const {data} = await authApi.signIn(credential);
            dispatch({
                type:"AUTH",
                payload:data 
            });
            dispatch(SET_SUCCESS_NOTIFICATION({message:"Signed In successfully!"}));
            history.push("/");
        } catch (error) {
            console.log(error);
            dispatch(SET_SUCCESS_NOTIFICATION({message:"Failed to Signed In!"}));
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
            dispatch(SET_SUCCESS_NOTIFICATION({message:"Signed Up successfully! You can now log in with your account"}));
        } catch (error) {
            dispatch(SET_ERROR_NOTIFICATION({message:"Signed Up failed"}));
            console.log(error);
        }
    };
};