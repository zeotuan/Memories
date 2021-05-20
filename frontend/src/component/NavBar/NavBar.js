import React from "react";
import {AppBar, Avatar, Toolbar, Typography, Button} from "@material-ui/core";
import useStyles from "./style";
import memories from "../../images/memories.jpg"
import {Link} from 'react-router-dom'

const NavBar = () => {
    const classes = useStyles();
    const user = null;
    return  (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div classNmae={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading}></Typography>
            </div>
            <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
            <img className={classes.image} src={memories} alt="memories" height="60" />
            <div>
                <Toolbar className={classes.toolbar}>
                    {user? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imgageUrl}>{user.result.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                            <Button variant="contained" className={classes.logout} color="secondary">logout</Button>
                        </div>
                    ) : (
                        <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                    )}
                </Toolbar>
            </div>
        </AppBar>

    )
}

export default NavBar;