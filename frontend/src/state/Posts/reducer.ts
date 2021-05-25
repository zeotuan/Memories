import Action from './action';
import {Post} from '../../type';

export interface postState{
    posts:Array<Post>;
    isLoading:boolean;
    currentPage:number|null;
    numberOfPages:number|null;
    post:Post|null;
}

const initialState:postState = {
    posts:[],
    isLoading:false,
    currentPage:null,
    numberOfPages:null,
    post:null
}

const reducer = (state = initialState, action:Action):postState => {
    switch(action.type){
        case 'FETCH_ALL':
            return {
                ...state,
                posts: action.payload.posts,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            };
        case 'GET_POST':
                return {
                    ...state,
                    post:action.payload
                };
        case 'CREATE':
            return {
                ...state,
                posts: [...state.posts, action.payload]
            };
        case 'UPDATE':
            return {
                ...state,
                posts: state.posts.map(p => p._id !== action.payload._id? p : action.payload)
            };

        case 'DELETE':
            return  {
                ...state,
                posts: state.posts.filter(p => p._id !== action.payload)
            };
        case 'LIKE':
            return {
                ...state, 
                posts: state.posts.map(p => p._id !== action.payload._id? p : action.payload)
            }; 
        case 'FETCH_BY_SEARCH':
            return {
                ...state,
                posts: action.payload
            };
        case 'START_LOADING':
            return {
                ...state,
                isLoading:true
            };

        case 'STOP_LOADING':
            return {
                ...state,
                isLoading:false
            };
        default:
            return state;
    }
};

export default reducer;

