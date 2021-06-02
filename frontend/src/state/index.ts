import {combineReducers} from 'redux';
import AuthAction from './Auth/action';
import PostAction from './Posts/action';
import NotificationAction from './Notification/action';
import posts from './Posts/reducer';
import auth from './Auth/reducer';
import notification from './Notification/reducer';


const reducer = combineReducers({
    posts,
    auth,
    notification
});
export type RootState = ReturnType<typeof reducer>;
export type AppAction = AuthAction | PostAction | NotificationAction;

export default reducer;