import {combineReducers} from 'redux';
import posts from './Posts/reducer';
import auth from './Auth/reducer';

const reducer = combineReducers({
    posts,
    auth
});
export type RootState = ReturnType<typeof reducer>

export default reducer;