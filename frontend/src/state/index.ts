import {combineReducers} from 'redux';
import AuthAction from './Auth/action';
import PostAction from './Posts/action';
import posts from './Posts/reducer';
import auth from './Auth/reducer';



const reducer = combineReducers({
    posts,
    auth
});
export type RootState = ReturnType<typeof reducer>
export type AppAction = AuthAction | PostAction;

export default reducer;