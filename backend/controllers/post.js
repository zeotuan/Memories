import mongoose from 'mongoose';
import postMessage from '../models/postMessage.js';

export const getPosts = async (req,res) => {
    //console.log(req)
    const {page} = req.query;
    try {
        const LIMIT = 8;
        const startIndex  = (Number(page) - 1) * LIMIT;
        const total = await postMessage.countDocuments({});
        const posts = await postMessage.find({}).sort({_id: -1}).limit(LIMIT).skip(startIndex);//simple pagination

        return res.status(200).json({
            posts,
            currentPage:Number(page),
            numberOfPages:Math.ceil(total/LIMIT)
        });
        
    } catch (error) {
        return res.status(400).json({error});
    }
};



export const getPostsBySearch = async (req, res) => {
    const {searchQuery, tags} = req.query;
    try{
       const title  = new RegExp(searchQuery,'i');
       const posts = await postMessage.find({$or:[{title},{tags:{$in:tags.split(',')}}]});
       res.json(posts)
    }catch(error){
        return res.status(400).json({error})
    }
}


export const createPost = async (req,res) => {
    const body = req.body;
    if(!req.userId){
        return res.status(400).json({error:'unauthenticated'}); 
    }
    try {
        const newPost = new postMessage({...body, creator:req.userId, createdAt: new Date().toISOString()});
        await newPost.save();
        return res.status(200).json(newPost);
    } catch (error) {
        return res.status(409).json({error});
    }
}

export const getPost = async (req,res) => {
    const id = req.params.id;
    try{
        const post = await postMessage.findById(id);
        if(post){
            return res.status(200).json(post);
        }
        return res.status(404).json({error:'cannot find post with this id'});
    }catch(error){
        return res.status(400).jsons({error})
    }
}

export const updatePost = async (req,res) => {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'invalid id'});
    }
    if(!req.userId){
        return res.status(400).json({error:'unauthenticated'}); 
    }
    const body = req.body;
    try {
        const post = await postMessage.findById(id);
        if(!post){
            res.status(404).json({error:'post does not exist'});
        }
        if(post.creator !== req.userId ){
            res.status(400).json({error:'unauthenticated'});
        }
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
        return res.json({message:'post delete successfully'})
    } catch (error) {
        return res.status(400).json({error});
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
    try {
        const post = await postMessage.findById(id);
        if(!post.likes.includes(req.userId)){
            post.likes.push(req.userId);
        }else{
            post.likes = post.likes.filter( id => id.toString() !== req.userId.toString());
        }
        await post.save();
        return res.status(200).json(post);
    } catch (error) {
        return res.status(400).json({error:error});
    }
}