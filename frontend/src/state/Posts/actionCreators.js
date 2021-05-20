import * as api from "../../api";

export const getPost = () => { 
    return async (dispatch) => {
        try {
            const {data: posts} = await api.getPost();
            
            dispatch({
                type:'FETCH_ALL',
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
                type:'CREATE',
                payload:createdPost
            })  
        } catch (error) {
            console.log(error);
        }
        
    }
}