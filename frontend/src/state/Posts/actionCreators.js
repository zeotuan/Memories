import {postApi} from "../../api";
import * as action from "./action";

export const getPosts = (page) => { 
    return async (dispatch) => {
        try {
            dispatch({type:action.START_LOADING})
            const {data: {posts,currentPage,numberOfPages}} = await postApi.getPosts(page);
            dispatch({
                type:action.FETCH_ALL,
                payload:{
                    posts,
                    currentPage,
                    numberOfPages
                }
            }); 
            dispatch({type:action.STOP_LOADING})
        } catch (error) {
            console.log(error.message);   
        }
    }
}

export const getPostBySearch = (searchQuery) => {
    return async (dispatch) => {
        try {
            dispatch({type:action.START_LOADING})
            const {data: posts} = await postApi.getPostBySearch(searchQuery);
            dispatch({
                type:action.FETCH_BY_SEARCH,
                payload:posts
            });
            dispatch({type:action.STOP_LOADING})
        } catch (error) {
            console.log(error);
        }
    }
}


export const createPost = (newPost,history) => {
    return async (dispatch) => {
        try {
            dispatch({type:action.START_LOADING});
            const {data: createdPost} = await postApi.createPost(newPost); 
            history.push(`/posts/${createdPost._id}`); 
            dispatch({
                type:action.CREATE,
                payload:createdPost
            });
            dispatch({type:action.STOP_LOADING}); 
        } catch (error) {
            console.log(error);
        }
        
    };
}

export const updatePost = (id,post) => {
    return async (dispatch) => {
        try {
            const {data: updatedPost} = await postApi.updatePost(id,post);
            dispatch({
                type:action.UPDATE,
                payload:updatedPost
            });
        } catch (error) {
            console.log(error);
        }
    };
}

export const deletePost = (id) => {
    return async (dispatch) => {
        try {
            await postApi.deletePost(id);
            dispatch({
                type:action.DELETE,
                payload:id
            });
        } catch (error) {
            console.log(error);
        }
    };
} 

export const likePost = (id) => {
    return async (dispatch) => {
        try{
            const {data:likedPost} = await postApi.likePost(id);
            dispatch({
                type:action.LIKE,
                payload:likedPost,
            });
        }catch(error){
            console.log(error);
        }
    }
}

export const getPostById = (id) => {
    return async (dispath) => {
        try{
            dispath({type:action.START_LOADING});
            const {data:post} = await postApi.getPostById(id);
            dispath({type:action.GET_POST, payload:post});
            dispath({type:action.STOP_LOADING});
        }catch(error){
            console.log(error);
        }
    }
}