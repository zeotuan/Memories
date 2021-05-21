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
            return state.map(p => p.id !== action.payload._id? p : action.payload); 
        default:
            return state;
    }
}

export default reducer;

