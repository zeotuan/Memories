import {postApi} from "../../api";
import * as action from "./action";

export const getPost = (page) => { 
    return async (dispatch) => {
        try {
            dispatch({type:action.START_LOADING})
            const {data: {posts,currentPage,numberOfPages}} = await postApi.getPost(page);
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


export const createPost = (newPost) => {
    return async (dispatch) => {
        try {
            dispatch({type:action.START_LOADING})
            const {data: createdPost} = await postApi.createPost(newPost);  
            dispatch({
                type:action.CREATE,
                payload:createdPost
            }) 
            dispatch({type:action.STOP_LOADING}) 
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