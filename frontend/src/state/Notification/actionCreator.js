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


