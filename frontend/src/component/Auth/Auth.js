import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './style';
import Input from  './Input';
import {GoogleLogin} from 'react-google-login';
import Icon from './Icon';
import {useDispatch} from 'react-redux';
import {SignIn,SignUp} from '../../state/Auth/actionCreator';

//import {useSelector} from 'react-redux';
const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [authFormData,setAuthFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignUp){
            dispatch(SignUp(authFormData,history));
        }else{
            dispatch(SignIn({ email:authFormData.email, password:authFormData.password },history));
        }

    };
    const handleChange = (e) => {
        setAuthFormData({...authFormData, [e.target.name]:e.target.value});
    };
    const handleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    }
    const SwithMode = () => {
        setIsSignUp((prevState)=> !prevState);
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        console.log(res);
        try {
            dispatch({type:'AUTH',payload:{result,token}})
            history.push("/");
        } catch (error) {
            console.log(error);
        }
    };

    const googleFailure = () => {
        console.log("google signIn fail");
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5" >{isSignUp? "Sign Up" : "Sign In"}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {isSignUp && (
                        <>
                            <Input name="firstName" label="First Name" value={authFormData.firstName} handleChange={handleChange} autoFocus half />
                            <Input name="lastName" label="Last Name" value={authFormData.lastName} handleChange={handleChange} half />
                        </>
                    )}
                    <Input name="email" label="Email" value={authFormData.email} handleChange={handleChange} half type="email"/>
                    <Input name="password" label="Password" value={authFormData.password} handleChange={handleChange} half type={showPassword? "text" : "password"} handleShowPassword={handleShowPassword}/>
                    {isSignUp && <Input  name="confirmPassword" label="repeat password" value={authFormData.confirmPassword} handleChange={handleChange} type="password"/>}
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                    {isSignUp ? "Sign Up" : "Sign In"}
                </Button>
                <GoogleLogin 
                    clientId="490051015891-9hi0j7h04roior86nl069e8jtpprbsat.apps.googleusercontent.com"
                    render={(renderProps)=>{
                        return (
                        <Button 
                            className={classes.googleButton} 
                            color="primary" 
                            fullWidth 
                            onClick={renderProps.onClick} 
                            disable={renderProps.disable} 
                            startIcon={<Icon />}
                            variant="contained"
                        > 
                            Sign In With Goggle
                        </Button>)
                    }}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                />
                <Grid container justify="flex-end" >
                    <Grid item>
                        <Button onClick={SwithMode}>
                            {isSignUp? "Already a Member? Sign In" : "Not Registered? Sign Up"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
            </Paper>
        </Container>
    )
}

export default Auth
