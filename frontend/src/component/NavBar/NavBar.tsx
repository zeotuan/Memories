import React, { useState, useEffect } from "react";
import {AppBar, Avatar, Toolbar, Typography, Button} from "@material-ui/core";
import useStyles from "./style";
import MemoriesN from "../../images/MemoriesN.png";
import cameraLense from "../../images/cameraLense.png";
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {useHistory, useLocation} from 'react-router-dom';
import decode from 'jwt-decode';
import getUserFromStorage from '../../utils/userExtractor';
const NavBar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [user,setUser] = useState(getUserFromStorage());
    useEffect(()=>{
        const token = user?.token;
        if(token){
            const decodedToken = decode(token);
            if((decodedToken as any).exp * 1000 < new Date().getTime()){
                logOut();
            }
        }
        setUser(getUserFromStorage());
    },[location]);
    const logOut = () => {
        dispatch({type:'LOGOUT'});
        history.push('/auth');
        setUser(null);
    };

    return  (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to='/' className={classes.brandContainer}>
                <img className={classes.image} src={MemoriesN} alt="memories" height="45px" /> 
                <img className={classes.image} src={cameraLense} alt="memories" height="40px" /> 
            </Link>  
            
            
            <div>
                <Toolbar className={classes.toolbar}>
                    {user? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user.user.name} src={user.user.imageUrl}>{user.user.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant="h6">{user.user.name}</Typography>
                            <Button variant="contained" className={classes.logout} color="secondary" onClick={logOut}>logout</Button>
                        </div>
                    ) : (
                        <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                    )}
                </Toolbar>
            </div>
        </AppBar>

    );
};

export default NavBar;