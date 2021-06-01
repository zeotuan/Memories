import {Dispatch} from 'react';
import Action from './action';
import {NotificationState} from '../../type';

type SetNotificationParam = Omit<NotificationState,'visibility'>; 
export type notificationDispath = Dispatch<Action|((dispatch:Dispatch<Action>)=>void)>;

export const SET_NOTIFICATION = ({severity, title, message}:SetNotificationParam) => {
    return (dispatch:Dispatch<Action>) => {
        dispatch({
            type:"SET_NOTIFICATION",
            payload:{
                severity,
                title,
                message,
                visibility:true
            }
        });
        setTimeout(()=>{
            dispatch({ type:"HIDE_NOTIFICATION"});
        },2000)
    }
}

//might not really be a good idea :V
export const SET_ERROR_NOTIFICATION = ({title = 'Error', message}:{title?:string, message:string}) => {
    return (dispatch:notificationDispath) => {
        dispatch(SET_NOTIFICATION({severity:'error',title,message}));
    }
}

export const SET_SUCCESS_NOTIFICATION = ({title = 'Success', message}:{title?:string,message:string}) => {
    return (dispatch:notificationDispath) => {
        dispatch(SET_NOTIFICATION({severity:'success',title,message}));
    }
}


