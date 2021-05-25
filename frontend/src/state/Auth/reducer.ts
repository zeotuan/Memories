import Action from './action';

const reducer = (state={authData: null},action:Action) => {
    switch(action.type){
        case "AUTH":
            localStorage.setItem('profile', JSON.stringify({...action.payload}));
            return {...state, authData:action.payload};
        case "LOGOUT":
            localStorage.removeItem('profile');
            return {...state,authData:null};
        case  "SIGNUP":
            return state;
        default:
            return state;
    }
};

export default reducer;