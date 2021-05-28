import {User} from '../type';

export interface AuthenticationItem{
    user:User;
    token:string;
}

const getUserFromStorage = ():AuthenticationItem|undefined => {
    const profile = localStorage.getItem('profile');
    if(profile){
        const userResult = JSON.parse(profile);
        if(userResult.result && userResult.token){
            return {
                user: userResult.result as User,
                token:userResult.token as string                
            }
        }
    }
    return undefined;
}
export default getUserFromStorage;