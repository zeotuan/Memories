import {FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH, START_LOADING, STOP_LOADING} from './action';

const reducer = (state = {posts:[], isLoading:false}, action) => {
    switch(action.type){
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.posts,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            };
        case CREATE:
            return {
                ...state,
                posts: [...state.posts, action.payload]
            };
        case UPDATE:
            return {
                ...state,
                posts: state.posts.map(p => p._id !== action.payload._id? p : action.payload)
            };

        case DELETE:
            return  {
                ...state,
                posts: state.posts.filter(p => p._id !== action.payload)
            }
        case LIKE:
            return {
                ...state, 
                posts: state.posts.map(p => p._id !== action.payload._id? p : action.payload)
            } 
        case FETCH_BY_SEARCH:
            return {
                ...state,
                posts: action.posts.payload
            }
        case START_LOADING:
            return {
                ...state,
                isLoading:true
            }

        case STOP_LOADING:
            return {
                ...state,
                isLoading:false
            }
        default:
            return state;
    }
}

export default reducer;

