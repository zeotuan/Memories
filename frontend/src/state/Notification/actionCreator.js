import * as action from './action';


export const SET_NOTIFICATION = (severity, title, message) => {
    return (dispatch) => {
        dispatch({
            type:action.SET_NOTIFICATION,
            payload:{
                severity,
                title,
                message,
                visibility:true
            }
        });
        setTimeout(()=>{
            dispatch({ type:action.HIDE_NOTIFICATION })
        },2000)
    }
}


export const SET_ERROR_NOTIFICATION = (title = 'Error', message) => {
    return (dispatch) => {
        dispatch(SET_NOTIFICATION('error',title,message));
    }
}

export const SET_SUCCESS_NOTIFICATION = (title = 'Success', message) => {
    return (dispatch) => {
        dispatch(SET_NOTIFICATION('success',title,message));
    }
}


