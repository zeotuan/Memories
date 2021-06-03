import {Dispatch} from 'react';
import Action from './action';
import {authApi} from '../../api';
import {Credential, AuthFormData} from '../../type';
import {SET_ERROR_NOTIFICATION, SET_SUCCESS_NOTIFICATION} from '../Notification/actionCreator';
import {History, Location} from 'history';
import {notificationDispath} from '../Notification/actionCreator';

export type authDispath = Dispatch<Action|((dispatch:notificationDispath)=>void)>;

export const SignIn = (credential:Credential, history:History<Location>) => {
    return async (dispatch:authDispath) => {
        try {
            let result;
            switch(credential.type){
                case "googleSignIn":
                    result = await authApi.signInWithGoogle(credential.idToken);        
                    break;
                case "normalSignIn":
                    result = await authApi.signIn(credential);
                    break;
                default:
                    return;
            }
            const {data: signInUser} = result;
            dispatch({
                type:"AUTH",
                payload: signInUser
            });
            dispatch(SET_SUCCESS_NOTIFICATION({message:"Signed In successfully!"}));
            history.push("/");
        } catch (error) {
            console.log(error);
            dispatch(SET_ERROR_NOTIFICATION({message:"Failed to Signed In!"}));
        }
    };
};

export const SignUp = (authFormData:AuthFormData, history:History<Location>) => {
    return async (dispatch:authDispath) => {
        try {
            const {data: signedUpUser} = await authApi.signUp(authFormData);
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