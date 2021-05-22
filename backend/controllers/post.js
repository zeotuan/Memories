import mongoose from 'mongoose';
import postMessage from '../models/postMessage.js'

export const getPosts = async (req,res) => {
    try {
        const postMessages = await postMessage.find({});
        return res.status(200).json(postMessages);
    } catch (error) {
        return res.status(404).json({error:error.message});
    }
};


export const createPost = async (req,res) => {
    const body = req.body;
    console.log(body);
    if(!req.userId){
        return res.status(400).json({error:'unauthenticated'}); 
    }
    try {
        const newPost = new postMessage({...body, creator:req.userId, createdAt: new Date().toISOString()});
        await newPost.save();
        return res.status(200).json(newPost);
    } catch (error) {
        return res.status(409).json({error:error.message});
    }
}

export const updatePost = async (req,res) => {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'invalid id'});
    }
    const body = req.body;
    try {
        const updatedPost = await postMessage.findByIdAndUpdate(id,body,{new:true});
        res.json(updatedPost);
    } catch (error) {
        res.status(400).json({error:error});
    }
}

export const deletePost = async (req,res) => {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'invalid id'});
    }
    const body = req.body;
    try {
        await postMessage.findByIdAndDelete(id);
        res.json({message:'post delete successfully'})
    } catch (error) {
        res.status(400).json({error:error});
    }
}


export const likePost = async (req,res) => {
    const id = req.params.id;
    if(!req.userId){
        return res.status(400).json({error:'unauthenticated'}); 
    }
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'invalid id'});
    }
    const body = req.body;
    try {
        const post = postMessage.findById(id);
        const index = post.likes.findIndex(id => id === toString(req.userId));
        if(index === -1){
            post.likes.push(req.userId);
        }else{
            post.likes = post.likes.filter(id=> id !== req.userId);
        }
        await post.save();
        return res.status(200).json(post);
    } catch (error) {
        res.status(400).json({error:error});
    }
}