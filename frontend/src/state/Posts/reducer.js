const reducer = (state = [], action) => {
    switch(action.type){
        case "FETCH_ALL":
            return action.payload;
        case "CREATE":
            return [
                ...state,
                action.payload
            ];
        case "UPDATE":
            const newPost = state.map(p => p._id !== action.payload._id? p : action.payload)
            return newPost;
        default:
            return state;
    }
}

export default reducer;

