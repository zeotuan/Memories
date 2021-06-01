import React from  'react';
import Post from './Post/Post';
import useStyles from './style';
import {useSelector} from 'react-redux';
import {CircularProgress, Grid, Typography} from '@material-ui/core';
import {RootState} from '../../state';
interface postsProps{
    setCurId:React.Dispatch<React.SetStateAction<string|null>>
}

const Posts = ({setCurId}:postsProps) => {
    const classes  = useStyles();
    const {posts,isLoading} = useSelector((state:RootState)=>state.posts);
    return (
        isLoading ? <CircularProgress /> 
        : posts ? (
            <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                {
                    posts.map(post => (
                        <Grid key={post._id} xs={12} sm={12} md={6} lg={3} item>
                            <Post post={post} setCurId={setCurId}/>
                        </Grid>
                    ))
                }
            </Grid>
        ): (
            <Typography variant="h6"> Noyhing to see here</Typography>
        )
    );
};

export default Posts;