import React from 'react';  
import {useSelector} from 'react-redux';
import { Alert,AlertTitle } from '@material-ui/lab';

const Notification = () => {
    const {severity,title,message,visibility} = useSelector((state)=>state.notification);
    return (
        <div>
        { visibility? 
            <Alert severity={severity|| "success"}>
                <AlertTitle>{title}</AlertTitle>
                {message}
            </Alert>
            : null
        }
        </div>
    )
}

export default Notification;