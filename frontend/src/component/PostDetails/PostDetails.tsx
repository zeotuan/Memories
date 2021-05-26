import React, {useEffect} from 'react';
import {Paper, Typography, CircularProgress, Divider} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {useParams} from 'react-router-dom';
import useStyles from './styles';
import {getPostById} from '../../state/Posts/actionCreators';
import {RootState} from '../../state';
const PostDetails = () => {
    const classes = useStyles();
    const {id} = useParams<{id:string}>();
    const {post,isLoading} = useSelector((state:RootState) => state.posts);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPostById(id));
    },[]);
    if(!post){
        return null;
    }
    return (
        
        isLoading? 
        <Paper className={classes.loadingPaper} elevation={6}>
            <CircularProgress size="7em"/>
        </Paper>
        : <Paper className={classes.paper} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h3" component="h2">{post.title}</Typography>
                    <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                    <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                    <Typography variant="h6">Created by: {post.creatorName}</Typography>
                    <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                </div>
                <div className={classes.imageSection}>
                    <img className={classes.media} src={post.file || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
                </div>
            </div>
        </Paper>
    );
};

export default PostDetails;
