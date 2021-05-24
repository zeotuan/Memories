import {User} from '../type';
const getUserFromStorage = ():User|null => {
    const profile = localStorage.getItem('profile');
    if(profile){
        const userResult = JSON.parse(profile);
        if(userResult.result){
            return userResult.result as User
        }
        
    }
    return null;
}

export default getUserFromStorage;