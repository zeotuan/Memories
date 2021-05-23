import React from 'react';
import useStyles from './style';
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined'
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {deletePost, likePost} from '../../../state/Posts/actionCreators';

const Likes = ({user, post}) => {
    if (post.likes.length > 0) {
        return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
          ? (
            <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
          ) : (
            <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
          );
      }
      return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
}

const Post = ({setCurId, post}) => {
    const classes  = useStyles(); 
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    return (
        <Card className={classes.card} raised elevation={6}> 
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
            <div className={classes.overlay}>
                <Typography variant="h6">{post.creatorName}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {
                (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && 
                <div className={classes.overlay2}>
                    <Button style={{color:'white'}} size="small" onClick={()=> {setCurId(post._id)}}>
                        <MoreHorizIcon fontSize="default" />
                    </Button>
                </div>
            }    
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary"> {post.tags.map((tag)=>`#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom> {post.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary"> {post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={()=>{dispatch(likePost(post._id))}}>
                    <Likes user={user} post={post}/>
                </Button>
                {
                    (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && 
                    <Button size="small" color="primary" onClick={()=>{window.confirm("do you want to delete this post") && dispatch(deletePost(post._id)) }}>
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>
                }
                
            </CardActions>
        </Card>
    )
};

export default Post;