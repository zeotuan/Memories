import React,{useState, useEffect, FormEvent} from 'react';
import {TextField, Typography, Button, Paper} from '@material-ui/core';
import useStyles from './style';
import {useDispatch, useSelector} from 'react-redux';
import {createPost, updatePost} from '../../state/Posts/actionCreators';
import {useHistory} from 'react-router-dom';
import {Post} from '../../type';
import GetUserFromStorage from '../../utils/userExtractor';
import {RootState} from '../../state';
import ChipInput from 'material-ui-chip-input';

export interface PostData{
    title:string,
    message:string,
    tags:Array<string>
    file:any
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
        tags:[],
        file:undefined,
        creatorName:""
    });
    const dispatch = useDispatch(); 
    const classes  = useStyles();
    const post = useSelector((state:RootState) => curId? state.posts.posts.find(p => p._id === curId): null);
    const authItem = GetUserFromStorage();
    const history = useHistory();
    useEffect(()=>{
        if(post){
            setPostData({...post, tags:post.tags});
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
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.name === "file" && e.target.files){
            setPostData({...postData,file: e.target.files[0]});
        }else{
            setPostData({...postData, [e.target.name]:e.target.value});
        }
        console.log(postData);
    };
    
    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(postData).forEach( key => postData[key as keyof PostData] && formData.append(key,postData[key as keyof PostData]));
        if(curId){
            dispatch(updatePost(curId,formData));
             
        }else{
            formData.append("creatorName", authItem.user.name);
            dispatch(createPost(formData,history) ); 
        }
        clear();
    };
    const clear = () => {
        setPostData({title:"", message:"", tags:[], file:undefined, creatorName:""});
        setCurId(null);
    };

    const handleAddTag = (tag:string) => {
        setPostData({...postData, tags:[...postData.tags, tag]});
    }

    const handleDeleteTag = (tagToDelete:string) => {
        setPostData({...postData, tags:postData.tags.filter((tag) => tag !== tagToDelete)});
    }

    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={(e)=>handleSubmit(e)}>
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
                <div style={{ padding: '5px 0', width: '94%' }}>
                    <ChipInput
                        variant="outlined"
                        label="Tags"
                        fullWidth
                        value={postData.tags}
                        onAdd={(chip) => handleAddTag(chip)}
                        onDelete={(chip) => handleDeleteTag(chip)}
                    />
                </div>

                <div className={classes.fileInput}> 
                    <input name="file" id="file" hidden type="file" onChange={handleChange}/>
                    <label htmlFor="file">
                        <Button variant="outlined" component="span" size="small" >
                            {postData.file? postData.file.name : "Upload Image"}
                        </Button>
                    </label>
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