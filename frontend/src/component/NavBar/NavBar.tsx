import React, {useEffect,useState } from "react";
import {AppBar, Avatar, Toolbar, Typography, Button, /*IconButton*/} from "@material-ui/core";
//import AccountCircle from '@material-ui/icons/AccountCircle';
import useStyles from "./style";
import MemoriesN from "../../images/MemoriesN.png";
import cameraLense from "../../images/cameraLense.png";
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {useHistory, useLocation} from 'react-router-dom';
import decode from 'jwt-decode';
import getUserFromStorage from '../../utils/userExtractor';
import {History, Location} from 'history';
import {IDecodedToken} from '../../type';
const NavBar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history:History<Location> = useHistory();
    const location = useLocation();
    const [user,setUser] = useState(getUserFromStorage());
    useEffect(()=>{
        const token = user?.token;
        if(token){
            const decodedToken = decode<IDecodedToken>(token);
            if(decodedToken.exp * 1000 < new Date().getTime()){
                logOut();
            }
        }
        setUser(getUserFromStorage());
    },[location]);
    const logOut = () => {
        dispatch({type:'LOGOUT'});
        setUser(undefined);
        history.push('/auth'); 
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
                            <Avatar className={classes.purple} alt={user.user.name} src={user.user.imageUrl? user.user.imageUrl : ''}>{user.user.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant="h6">{user.user.name}</Typography>
                            <Button variant="contained" className={classes.logout} color="secondary" onClick={logOut}>logout</Button>
                        </div>
                    ) : (
                        <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                    )}
                    {/* <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        onClick={()=>{console.log('yahhoo');}}
                        color="inherit"
                        >
                        <AccountCircle />
                    </IconButton> */}
                </Toolbar>
            </div>
        </AppBar>

    );
};

export default NavBar;