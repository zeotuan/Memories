import * as action from './action';
import {SET_NOTIFICATION} from '../Notification/actionCreator';
import {authApi} from '../../api';

export const SignIn = (credential, history) => {
    return async (dispatch) => {
        try {
            const {data} = await authApi.signIn(credential);
            dispatch({
                type:action.AUTH,
                payload:data 
            });
            dispatch(SET_NOTIFICATION("success","Success","Login Successfully"));
            history.push("/");
        } catch (error){
            dispatch(SET_NOTIFICATION("error","Login Fail","invalid Username or Password"));
            console.log(error);
        }
        
    }
}

export const SignUp = (authFormData, history) => {
    return async (dispatch) => {
        try {
            const signedUpUser = await authApi.signUp(authFormData);
            dispatch({
                type:action.SIGNUP,
                payload:signedUpUser
            })
            history.push("/auth")
        } catch (error) {
            console.log(error)
        }
    }
}