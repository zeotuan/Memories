import React,{useState, useEffect} from 'react';
import {TextField, Typography, Button, Paper} from '@material-ui/core';
import FileBase from 'react-file-base64'
import useStyles from './style';
import {useDispatch, useSelector} from 'react-redux';
import {createPost, updatePost} from '../../state/Posts/actionCreators';
import {useHistory} from 'react-router-dom';

const Form = ({setCurId, curId}) => {
    const [postData, setPostData] = useState({
        title:"",
        message:"",
        tags:"",
        selectedFile:"",
        creatorName:""
    });
    const dispatch = useDispatch(); 
    const classes  = useStyles();
    const post = useSelector(state => curId? state.posts.posts.find(p => p._id === curId): null);
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useHistory();
    useEffect(()=>{
        if(post){
            setPostData({...post});
        } 
    },[post])
    const handleSubmit = (e) => {
        e.preventDefault();
        if(curId){
            dispatch(updatePost(curId,{...postData}))
             
        }else{
            dispatch(createPost({...postData}),history ); 
        }
        clear();
    };
    const handleChange = (e) => {
        if(e.target.name === "tags"){
            setPostData({...postData, tags:e.target.value.split(','), creatorName: user?.result?.name });
        }else{
            setPostData({...postData, [e.target.name]:e.target.value});
        }
    }
    const clear = () => {
        setPostData({title:"", message:"", tags:"", selectedFile:""})
        setCurId(null);
    }

    if(!user?.result?.name){
        return (
            <Paper className={classes.paper} elevation={6}>
                <Typography variant="h6" align="center">
                    Sign In to create your own memories.
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
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
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64})=>{setPostData({...postData,selectedFile:base64})}}
                    />
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