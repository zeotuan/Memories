import React from 'react';
import {useDispath, useSelector} from 'react-redux';
import {useHisory, useHistory} from 'react-router-dom';
import useStyles from './styles';
import {getPostBySearch} from '../../state/Posts/actionCreators';
import { Divider, Typography } from '@material-ui/core';


const PostRecommendation = ({post}) => {
    const classes = useStyles();
    const dispatch = useDispath();
    const history = useHistory();
    const {posts} = useSelector(state => state.posts);

    useEffect(() => {
        post && dispatch(getPostBySearch({search:'none', tags:post.tags.join(',')}));
    }, [post])

    const openPost = (id) => {
        history.push(`/posts/${id}`);
    }
    // const recommendedPost = useSelector(
    //     state => state.posts.posts.filter( 
    //         post => post.tags.filter( 
    //             t => tags.includes(t)
    //             )
    //         )
    //     );
    return (
        <React.Fragment>
            {recommendedPost.length && (
                <div className={classes.section}>
                    <Typography gutterBottom variant="h5">Recommend Posts: </Typography>
                    <Divider>
                        <div className={classes.recommendedPosts}>
                            {posts.map(({title, message, name, likes, selectedFile, _id}) =>{
                                _id !== post._id && 
                                <div className={classes.recommendedPost} onClick={() => openPost(_id)} key={_id}>
                                    <Typography gutterBottom variant="h6">{title}</Typography>
                                    <Typography gutterBottom variant="subtitle2">{name}</Typography>
                                    <Typography gutterBottom variant="subtitle2">{message}</Typography>
                                    <Typography gutterBottom variant="subtitle1">Likes: {likes}</Typography>
                                    <img src={selectedFile} width="200px" />
                                </div>    
                            })}    
                        </div>
                    </Divider>
                </div>
            )}
        </React.Fragment>
    )
};


export default PostRecommendation
