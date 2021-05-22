import * as action from './action';
import {authApi} from '../../api';

export const SignIn = (credential, history) => {
    return async (dispatch) => {
        try {
            const {data} = await authApi.signIn(credential);
            dispatch({
                type:action.AUTH,
                payload:data 
            });
            history.push("/");
        } catch (error) {
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