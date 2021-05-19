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