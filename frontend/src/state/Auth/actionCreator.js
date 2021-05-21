import * as action from './action';
import {authApi} from '../../api';

export const Authorize = () => {
    return async (dispatch) => {
        const token = await authApi.login();
        dispatch({
            type:action.AUTH,
            payload:token
        })
    }
}