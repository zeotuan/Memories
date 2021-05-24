import {combineReducers} from 'redux';
import posts from './Posts/reducer';
import auth from './Auth/reducer';

export default combineReducers({
    posts,
    auth
});