import React from 'react';
import useStyles from './style';
import {Card, CardActions, CardContent, CardMedia, Button, Typography,ButtonBase} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {deletePost, likePost} from '../../../state/Posts/actionCreators';
import {useHistory, Link} from 'react-router-dom';
import {User, Post as IPost} from '../../../type';
import getUserFromStorage from '../../../utils/userExtractor';

interface likesProps{
    user:User|undefined;
    post:IPost;
}

const Likes = ({user, post}:likesProps) => {
    if (post.likes.length > 0) {
        return post.likes.find((like) => like === (user?.googleId || user?._id))
          ? (
            <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
          ) : (
            <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
          );
      }
      return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
};


interface postProps{
    post:IPost;
    setCurId:React.Dispatch<React.SetStateAction<string|null>>;
}



const Post = ({setCurId, post}:postProps) => {
    const classes  = useStyles(); 
    const dispatch = useDispatch();
    const history = useHistory();
    const authItem = getUserFromStorage();
    const user = authItem?.user;
    const openPost = () => {
        history.push(`/posts/${post._id}`);
    };
    
    return (
        <Card className={classes.card} raised elevation={6}> 
            <CardMedia className={classes.media} image={post.file} title={post.title}/>
                <div className={classes.overlay}>
                    <Typography variant="h6" className={classes.creatorNameLink} component={Link} to={`/${post.creatorName}`}>{post.creatorName}</Typography>
                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                </div>
                {
                    (user?.googleId === post?.creator || user?._id === post?.creator) && 
                    <div className={classes.overlay2}>
                        <Button style={{color:'white'}} size="small" onClick={()=> {setCurId(post._id);}}>
                            <MoreHorizIcon fontSize="default" />
                        </Button>
                    </div>
                }
            <ButtonBase className={classes.cardAction} onClick={openPost}>    
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary"> {post.tags.map((tag)=>`#${tag} `)}</Typography>
                </div>
                <Typography className={classes.title} variant="h5" gutterBottom> {post.title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary"> {post.message}</Typography>
                </CardContent>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={()=>{dispatch(likePost(post._id));}}>
                    <Likes user={user} post={post}/>
                </Button>
                {
                    (user?.googleId === post?.creator || user?._id === post?.creator) && 
                    <Button size="small" color="primary" onClick={()=>{window.confirm("do you want to delete this post") && dispatch(deletePost(post._id)); }}>
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>
                }
            </CardActions>
           
        </Card>
    );
};

export default Post;