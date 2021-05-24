import React from  'react';
import Post from './Post/Post';
import useStyles from './style';
import {useSelector} from 'react-redux';
import {CircularProgress, Grid} from '@material-ui/core';

interface postsProps{
    setCurId:any
}

const Posts = ({setCurId}:postsProps) => {
    const classes  = useStyles();
    const {posts,isLoading} = useSelector((state)=>state.posts);
    return (
        isLoading ? <CircularProgress /> 
        :(
            <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                {posts.map(post => (
                    <Grid key={post._id} xs={12} sm={12} md={6} lg={3} item>
                        <Post post={post} setCurId={setCurId}/>
                    </Grid>
                ))}
            </Grid>
        )
    );
};

export default Posts;