import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux'
import {Grid, Container, Grow} from '@material-ui/core'
import Posts from '../Posts/Posts'
import Form from '../Forms/Form';

import {getPost} from '../../state/Posts/actionCreators';
const Home = () => {
    const dispatch = useDispatch();
    const [curId, setCurId] = useState(null);
    useEffect(()=>{
        dispatch(getPost());
      },[dispatch])
    return (
        <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurId={setCurId}/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form curId={curId} setCurId={setCurId}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    )
}

export default Home;