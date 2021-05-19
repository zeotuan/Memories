import React, {useEffect} from 'react';
import {Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';
import memories from './images/memories.jpg';
import Posts from './component/Posts/Posts';
import Form from './component/Forms/Form';
import useStyles from './style';
import {useDispatch} from 'react-redux'
import {getPost} from './state/Posts/actionCreators';
const App = () => {
  const classes  = useStyles();
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getPost());
  },[dispatch])
  return (
    <Container maxWidth="lg" >
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
        <img className={classes.image} src={memories} alt="memories" height="60" />
      </AppBar>      
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
}

export default App;