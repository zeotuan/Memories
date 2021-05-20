import * as api from "../../api";
import * as action from "./action";

export const getPost = () => { 
    return async (dispatch) => {
        try {
            const {data: posts} = await api.getPost();
            
            dispatch({
                type:action.FETCH_ALL,
                payload:posts
            }); 
        } catch (error) {
            console.log(error.message);   
        }
    }
}


export const createPost = (newPost) => {
    return async (dispatch) => {
        try {
            const {data: createdPost} = await api.createPost(newPost);  
            dispatch({
                type:action.CREATE,
                payload:createdPost
            })  
        } catch (error) {
            console.log(error);
        }
        
    };
}

export const updatePost = (id,post) => {
    return async (dispatch) => {
        try {
            const {data: updatedPost} = await api.updatePost(id,post);
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
            await api.deletePost(id);
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
            await api.likePost(id);
            dispatch({
                type:action.LIKE,
                payload:id
            });
        }catch(error){
            console.log(error);
        }
    }
}