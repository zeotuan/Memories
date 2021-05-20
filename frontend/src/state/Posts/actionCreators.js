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
        
    };
}

export const updatePost = (id,post) => {
    return async (dispatch) => {
        try {
            const {data: updatedPost} = await api.updatePost(id,post);
            dispatch({
                type:'UPDATE',
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
                type:'DELETE',
                payload:id
            });
        } catch (error) {
            console.log(error);
        }
    };
} 