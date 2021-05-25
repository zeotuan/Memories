import React,{useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import useStyles from './styles';
import {getPostBySearch} from '../../../state/Posts/actionCreators';
import { Divider, Typography } from '@material-ui/core';
import {Post} from '../../../type';
import {RootState} from '../../../state';
interface PostRecommendationProps{
    post:Post
}

const PostRecommendation = ({post}:PostRecommendationProps) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const {posts} = useSelector((state:RootState) => state.posts);

    useEffect(() => {
        post && dispatch(getPostBySearch({search:'none', tags:post.tags.join(',')}));
    }, [post]);

    const openPost = (id:Post["_id"]) => {
        history.push(`/posts/${id}`);
    };
    // const recommendedPost = useSelector(
    //     state => state.posts.posts.filter( 
    //         post => post.tags.filter( 
    //             t => tags.includes(t)
    //             )
    //         )
    //     );
    return (
        <React.Fragment>
            {posts.length && (
                <div className={classes.section}>
                    <Typography gutterBottom variant="h5">Recommend Posts: </Typography>
                    <Divider>
                        <div className={classes.recommendedPosts}>
                            {posts.map(({title, message, creatorName, likes, selectedFile, _id}) =>{
                                _id !== post._id && 
                                <div className={classes.recommendedPost} onClick={() => openPost(_id)} key={_id}>
                                    <Typography gutterBottom variant="h6">{title}</Typography>
                                    <Typography gutterBottom variant="subtitle2">{creatorName}</Typography>
                                    <Typography gutterBottom variant="subtitle2">{message}</Typography>
                                    <Typography gutterBottom variant="subtitle1">Likes: {likes}</Typography>
                                    <img src={selectedFile} width="200px" />
                                </div>;    
                            })}    
                        </div>
                    </Divider>
                </div>
            )}
        </React.Fragment>
    );
};


export default PostRecommendation;
