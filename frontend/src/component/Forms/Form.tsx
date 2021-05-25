import React,{useState, useEffect, FormEventHandler, FormEvent} from 'react';
import {TextField, Typography, Button, Paper} from '@material-ui/core';
import useStyles from './style';
import {useDispatch, useSelector} from 'react-redux';
import {createPost, updatePost} from '../../state/Posts/actionCreators';
import {useHistory} from 'react-router-dom';
import {Post} from '../../type';
import GetUserFromStorage from '../../utils/userExtractor';
import {RootState} from '../../state'

export interface PostData{
    title:string,
    message:string,
    tags:string
    selectedFile:any
    creatorName:string
}

interface FormProps{
    setCurId:any;
    curId:Post['_id']|null;
}

const Form = ({setCurId, curId}:FormProps) => {
    const [postData, setPostData] = useState<PostData>({
        title:"",
        message:"",
        tags:"",
        selectedFile:undefined,
        creatorName:""
    });
    const dispatch = useDispatch(); 
    const classes  = useStyles();
    const post = useSelector((state:RootState) => curId? state.posts.posts.find(p => p._id === curId): null);
    const authItem = GetUserFromStorage();
    const history = useHistory();
    useEffect(()=>{
        if(post){
            setPostData({...post, tags:post.tags.join(',')});
        } 
    },[post]);
    
    if(!authItem?.user){
        return (
            
            <Paper className={classes.paper} elevation={6}>
                <Typography variant="h6" align="center">
                    Sign In to create your own memories.
                </Typography>
            </Paper>
        );
    }
    const handleChange = (e:any) => {
        if(e.target.name === "tags"){
            setPostData({...postData, tags:e.target.value.split(',')});
        }else if(e.target.name === "selectedFile"){
            setPostData({...postData,selectedFile: e.target.files})
        }else{
            setPostData({...postData, [e.target.name]:e.target.value});
        }
    };
    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();
        if(curId){
            dispatch(updatePost(curId,{...postData}));
             
        }else{
            dispatch(createPost({...postData,creatorName: authItem.user.name},history) ); 
        }
        clear();
    };
    const clear = () => {
        setPostData({title:"", message:"", tags:"", selectedFile:"", creatorName:""});
        setCurId(null);
    };

    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={(e)=>handleSubmit(e) } >
                <Typography variant="h6">{curId? 'Updating' :'Creating'} Memories</Typography>
                <TextField 
                    name="title" 
                    variant="outlined" 
                    label="title" 
                    fullWidth
                    value={postData.title}
                    onChange={handleChange}
                
                />
                <TextField 
                    name="message" 
                    variant="outlined" 
                    label="message" 
                    fullWidth
                    value={postData.message}
                    onChange={handleChange}
                
                />
                <TextField 
                    name="tags" 
                    variant="outlined" 
                    label="tags" 
                    fullWidth
                    value={postData.tags}
                    onChange={handleChange}
                
                />
                <div className={classes.fileInput}> 
                    <Button variant="contained" component="label"><input hidden type="file" onChange={handleChange}/></Button>
                </div>
                <Button 
                    className={classes.buttonSubmit} 
                    variant="contained" 
                    color="primary" 
                    size="large" 
                    type="submit" 
                    fullWidth
                >
                    Submit
                </Button>
                <Button 
                    className={classes.buttonSubmit} 
                    variant="contained" 
                    color="secondary" 
                    size="small" 
                    onClick={clear} 
                    fullWidth
                >
                    Clear
                </Button>
            </form>
        </Paper>
    );
};

export default Form;