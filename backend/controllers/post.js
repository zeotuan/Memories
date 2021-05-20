import mongoose from 'mongoose';
import postMessage from '../models/postMessage.js'

export const getPosts = async (req,res) => {
    try {
        const postMessages = await postMessage.find({});
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({error:error.message});
    }
};


export const createPost = async (req,res) => {
    const body = req.body;
    try {
        const newPost = new postMessage(body);
        await newPost.save();
        res.status(200).json(newPost);
    } catch (error) {
        res.status(409).json({error:error.message});
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
        res.status(400).json({error:error.message});
    }
}
