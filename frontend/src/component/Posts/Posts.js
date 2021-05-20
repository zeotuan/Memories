import React from  'react';
import Post from './Post/Post';
import useStyles from './style';
import {useSelector} from 'react-redux';
import {CircularProgress, Grid} from '@material-ui/core';

const Posts = ({setCurId}) => {
    const classes  = useStyles();
    const posts = useSelector((state)=>state.posts);
    return (
        !posts.length 
        ? <CircularProgress /> 
        :(
            <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                {posts.map(post => (
                    <Grid key={post._id} xs={12} sm={6} item>
                        <Post post={post} setCurId={setCurId}/>
                    </Grid>
                ))}
            </Grid>)
    )
}

export default Posts;