import React from 'react';
import useStyles from './style';

const Post = () => {
    const classes  = useStyles();
    
    
    return (
        <h1 className={classes.details}>Post</h1>
    )
};

export default Post;