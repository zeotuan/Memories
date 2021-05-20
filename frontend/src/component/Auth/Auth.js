import React, {useState} from 'react'
import {Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './style';
import Input from  './Input';
//import {useSelector} from 'react-redux';
const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true);
    const classes = useStyles();
    const handleSubmit = () => {

    };
    const handleChange = () => {

    };
    const handleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    }
    const SwithMode = () => {
        setIsSignUp((prevState)=> !prevState);
        setShowPassword(false);
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5" >{isSignUp? "Sign In" : "Sign Up"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignUp && (
                            <>
                                <Input name="firstname" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastname" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" label="Email" handleChange={handleChange} half type="email"/>
                        <Input name="password" label="Password" handleChange={handleChange} half type={showPassword? "text" : "password"} handleShowPassword={handleShowPassword}/>
                        {isSignUp && <Input  name="confirmPassword" label="repeat password" handleChange={handleChange} type="password"/>}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                        {isSignUp ? "Sign In" : "Sign Up"}
                    </Button>
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
