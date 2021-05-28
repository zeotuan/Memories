import {combineReducers} from 'redux';
import posts from './Posts/reducer';
import auth from './Auth/reducer';
import notification from './Notification/reducer';

export default combineReducers({
    posts,
    auth,
    notification
})