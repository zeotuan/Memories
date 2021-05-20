import React from  'react';
import Post from './Post/Post';
import useStyles from './style';
import {useSelector} from 'react-redux';

const Posts = () => {
    const classes  = useStyles();
    const posts = useSelector((state)=>state.posts);
    return (
        <React.Fragment>
            <h1 className={classes.mainContainer}>Posts</h1>
            <Post />
            <Post />
            <Post />
        </React.Fragment>
    )
}

export default Posts;