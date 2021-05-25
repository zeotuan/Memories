import React from 'react';  
import {useSelector} from 'react-redux';
import { Alert,AlertTitle} from '@material-ui/lab';
import {Collapse} from '@material-ui/core';
const Notification = () => {
    const {severity,title,message,visibility} = useSelector((state)=>state.notification);
    return (
        <Collapse in={visibility}>
            <Alert severity={severity|| "success"}>
                <AlertTitle>{title}</AlertTitle>
                {message}
            </Alert>
        </Collapse>
    )
}

export default Notification;