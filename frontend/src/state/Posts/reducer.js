import {FETCH_ALL, CREATE, UPDATE, DELETE, LIKE} from './action';

const reducer = (state = [], action) => {
    switch(action.type){
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [
                ...state,
                action.payload
            ];
        case UPDATE:
            return state.map(p => p._id !== action.payload._id? p : action.payload);

        case DELETE:
            return  state.filter(p => p._id !== action.payload);
        case LIKE:
            return state.map(p => {
                if(p._id !== action.payload){
                    return p;
                }
                const newPost = {
                    ...p,
                    likeCount: p.likeCount + 1
                };
                return newPost;
            }) 
        default:
            return state;
    }
}

export default reducer;

