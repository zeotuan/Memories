import config from './config.js';
import jwt from 'jsonwebtoken';

export const auth = async (req,res,next) => {
    const authorization = req.get('authorization');
    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
        const token = authorization.substring(7);
        const isCustomToken = token.length < 500;
        let decodedToken;
        if(isCustomToken){
            decodedToken = jwt.verify(token,config.JWT_SECRET);
            req.userId =  decodedToken?.id;
        }else{
            decodedToken = jwt.decode(token);
            req.userId = decodedToken?.sub;
        }
        
    }else{
        request.decodedToken = undefined;
    }  
    next();
}
