import {Dispatch} from "react";
import {postApi} from "../../api";
import Action from "./action";
import {Post,SearchQuery} from '../../type';
import {SET_ERROR_NOTIFICATION,SET_SUCCESS_NOTIFICATION} from '../Notification/actionCreator';

export type PostDispatch = Dispatch<Action|((dispatch:Dispatch<any>)=>void)>;
export const getPosts = (page:number|null) => { 
    return async (dispatch:PostDispatch) => {
        try {
            dispatch({type:"START_LOADING"});
            const {data: {posts,currentPage,numberOfPages}} = await postApi.getPosts(page);
            dispatch({
                type:"FETCH_ALL",
                payload:{
                    posts,
                    currentPage,
                    numberOfPages
                }
            }); 
            dispatch({type:"STOP_LOADING"});
        } catch (error) {
            console.log(error.message);   
        }
    };
};

export const getPostBySearch = (searchQuery:SearchQuery) => {
    return async (dispatch:PostDispatch) => {
        try {
            dispatch({type:'START_LOADING'});
            const {data: posts} = await postApi.getPostBySearch(searchQuery);
            dispatch({
                type:'FETCH_BY_SEARCH',
                payload:posts
            });
            dispatch({type:'STOP_LOADING'});
        } catch (error) {
            console.log(error);
        }
    };
};


export const createPost = (newPost:FormData,history:any) => {
    return async (dispatch:PostDispatch) => {
        try {
            dispatch({type:'START_LOADING'});
            const {data: createdPost} = await postApi.createPost(newPost); 
            history.push(`/posts/${createdPost._id}`); 
            dispatch({
                type:'CREATE',
                payload:createdPost
            });
            dispatch({type:'STOP_LOADING'}); 
            dispatch(SET_SUCCESS_NOTIFICATION({message:"Post created successfully"}));
        } catch (error) {
            dispatch(SET_ERROR_NOTIFICATION({message:"Failed to create post"}));
            console.log(error);
        }
        
    };
};

export const updatePost = (id:Post['_id'],post:FormData) => {
    return async (dispatch:PostDispatch) => {
        try {
            const {data: updatedPost} = await postApi.updatePost(id,post);
            dispatch({
                type:'UPDATE',
                payload:updatedPost
            });
            dispatch(SET_SUCCESS_NOTIFICATION({message:"Post updated successfully"}));
        } catch (error) {
            dispatch(SET_ERROR_NOTIFICATION({message:"Failed to update post"}));
            console.log(error);
        }
    };
};

export const deletePost = (id:Post['_id']) => {
    return async (dispatch:PostDispatch) => {
        try {
            await postApi.deletePost(id);
            dispatch({
                type:'DELETE',
                payload:id
            });
            dispatch(SET_SUCCESS_NOTIFICATION({message:"Post deleted successfully"}));
        } catch (error) {
            dispatch(SET_ERROR_NOTIFICATION({message:"Failed to delette post"}));
            console.log(error);
        }
    };
}; 

export const likePost = (id:Post['_id']) => {
    return async (dispatch:PostDispatch) => {
        try{
            const {data:likedPost} = await postApi.likePost(id);
            dispatch({
                type:'LIKE',
                payload:likedPost,
            });
        }catch(error){
            console.log(error);
        }
    };
};

export const getPostById = (id:Post['_id']) => {
    return async (dispath:PostDispatch) => {
        try{
            dispath({type:'START_LOADING'});
            const {data:post} = await postApi.getPostById(id);
            dispath({type:'GET_POST', payload:post});
            dispath({type:'STOP_LOADING'});
        }catch(error){
            console.log(error);
        }
    };
};