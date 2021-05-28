import {SET_NOTIFICATION,HIDE_NOTIFICATION} from './action';

const initialState ={
    severity:"",
    title:"",
    message:"",
    visibility:false 
}

const reducer = (state=initialState,action) => {
    switch(action.type){
        case SET_NOTIFICATION:
            return {
                ...state,
                severity:action.payload.severity,
                title:action.payload.title,
                message:action.payload.message,
                visibility:true
            };
        case HIDE_NOTIFICATION:
            return {...state, visibility:false};
        default:
            return state
    }
}

export default reducer;