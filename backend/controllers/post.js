import mongoose from 'mongoose';
import postMessage from '../models/postMessage.js';
import photoChunk from '../models/photoChunks.js';
import photoFiles from '../models/photoFiles.js'
import upload from '../utils/middleware/Upload.js';
import {getImages, deleteImage} from '../utils/ImageHelper.js';

export const getPosts = async (req,res) => {
    const {page} = req.query;
    try {
        const LIMIT = 8;
        const startIndex  = (Number(page) - 1) * LIMIT;
        const total = await postMessage.countDocuments({});
        const posts = await postMessage.find({}).sort({_id: -1}).limit(LIMIT).skip(startIndex);//simple pagination
        const images = await getImages(posts.map(post => post.file));
        const postsResult = posts.map(post => ({
            _id:post._id,
            title:post.title,
            message:post.message,
            creatorName:post.creatorName,
            creator:post.creator,
            tags:post.tags,
            likes:post.likes,
            createdAt:post.createdAt,   
            file:images[post.file].image
        }));
        return res.status(200).json({
            posts:postsResult,
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
       const images = await getImages(posts.map(post => post.file));
       const postsResult = posts.map(post => ({
            _id:post._id,
            title:post.title,
            message:post.message,
            creatorName:post.creatorName,
            creator:post.creator,
            tags:post.tags,
            likes:post.likes,
            createdAt:post.createdAt,   
            file:images[post.file].image
    }));
       res.json(postsResult);
    }catch(error){
        return res.status(400).json({error})
    }
}


export const createPost = async (req,res) => {
    if(!req.userId){
        return res.status(400).json({error:'unauthenticated'}); 
    }
    try {
        await upload(req,res);
        if(req.file){
            const body = req.body;
            let newPost = new postMessage({...body,tags:body.tags.split(','), creator:req.userId, createdAt: new Date().toISOString()});
            newPost.file = req.file.id;
            console.log(newPost);
            await newPost.save();
            return res.status(200).json(newPost);   
        }
        await deleteImage(req.file?.id);
        return res.status(400).json({error:"Failed to create post"});
    } catch (error) {
        await deleteImage(req.file?.id);
        return res.status(409).json({error});
    }
}

export const getPost = async (req,res) => {
    const id = req.params.id;
    try{
        const post = await postMessage.findById(id);
        if(post){
            const images = await getImages([post.file]);
            const postResult ={
                _id:post._id,
                title:post.title,
                message:post.message,
                creatorName:post.creatorName,
                creator:post.creator,
                tags:post.tags, 
                likes:post.likes,
                createdAt:post.createdAt,   
                file:images[post.file].image
            }
            return res.status(200).json(postResult);
        }
        return res.status(404).json({error:'cannot find post with this id'});
    }catch(error){
        return res.status(400).json({error})
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
        await upload(req,res);
        if(req.file){
            const post = await postMessage.findById(id);
            if(!post){
                res.status(404).json({error:'post does not exist'});
            }
            if(post.creator !== req.userId ){
                res.status(400).json({error:'unauthenticated'});
            }
            const updatedPost = await postMessage.findByIdAndUpdate(id,{...body, tags:body.tags.split(',')},{new:true});
            return res.json(updatedPost);
        }
        await deleteImage(req.file?.id);
        return res.status(400).json({error:"failed to update post"});
    } catch (error) {
        await deleteImage(req.file?.id);
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
        return res.status(400).json({error});
    }
}

export const getImage = async (req,res) => {
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'invalid id'});
    }
    
    try {
        const files = await photoFiles.findById(id);
        if(!files){
            return res.status(404).json({error:"image doesn't exist"});
        } 
        const chunks = await photoChunk.find({files_id:id}).sort({n:1});
        let fileData = [];
        if(!chunks || chunks.length === 0){
            return res.status(404).json({error:"image  doesn't exist"});
        }
        for(let i = 0; i < chunks.length; i++ ){
            fileData.push(chunks[i].data.toString('base64'));
        }
        const imageFile = "data:" + files.contentType + ";base64" + fileData.join("");
        res.status(200).json({image:imageFile});
    } catch (error) {
        return res.status(400).json({error});
    }
}


//controller for testing retrieving many image
export const getManyImage = async (req,res) => {
    const body = req.body;
    try{
        //const images = getImages(body.ids);
        const pfiles = await photoFiles.find({});
        const pfilesId = pfiles.map(pf => pf._id);
        const images = await getImages(pfilesId);
        // for( const [key, value] of Object.entries(images)){
        //     console.log({
        //         key,
        //         f:{
        //             f: value.file,
        //             i: value.image && 1
        //         }
        //     })
        // }
        return res.status(200).json(images);
    }catch(error){
        return res.status(400).json({error});
    }
}