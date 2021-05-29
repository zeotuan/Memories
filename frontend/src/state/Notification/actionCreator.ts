import Action from './action';
import {NotificationState} from '../../type';
import React from 'react';

type SetNotificationParam = Omit<NotificationState,'visibility'>; 
export type notificationDispath = React.Dispatch<Action>;

export const SET_NOTIFICATION = ({severity, title, message}:SetNotificationParam) => {
    return (dispatch:notificationDispath) => {
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
export const SET_ERROR_NOTIFICATION = (title = 'Error', message:string) => {
    return (dispatch:React.Dispatch<any>) => {
        dispatch(SET_NOTIFICATION({severity:'error',title,message}));
    }
}

export const SET_SUCCESS_NOTIFICATION = (title = 'Success', message:string) => {
    return (dispatch:React.Dispatch<any>) => {
        dispatch(SET_NOTIFICATION({severity:'success',title,message}));
    }
}


