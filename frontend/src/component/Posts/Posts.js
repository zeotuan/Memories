import React from  'react';
import Post from './Post/Post';

const Posts = () => {
    return (
        <React.Fragment>
            <h1>Posts</h1>
            <Post />
            <Post />
            <Post />
        </React.Fragment>
    )
}

export default Posts;