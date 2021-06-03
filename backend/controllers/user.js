import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 
import config from '../utils/config.js';
import User from '../models/user.js';
import verify from '../utils/verifyToken.js';
export const signUp = async (req, res) => {
    const body = req.body;
    if(!body.password){
        return res.status(400).json({error:"invalid password"});
    }
    try {
        const passwordHash = await bcrypt.hash(body.password,config.saltRound);
        const user = new User({
            email:body.email,
            firstName:body.firstName,
            lastName:body.lastName,
            passwordHash
        });
        await user.save();
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json(error)
    }
};

export const signIn = async (req, res) => {
    const body = req.body;
    if(!body || !body.email || !body.password){
        res.status(400).json({error:"invalid credential! if you logged in with google and forgot to set your password, please logged in with google again to set your password"})
    }
    try {
        const user = await User.findOne({email:body.email});
        if(!user){
            return res.status(404).json({error:"wrong username or password"});
        }        
        const correctPassword = await bcrypt.compare(body.password,user.passwordHash);
        
        if(correctPassword){
            const userForToken = {
                name:`${user.firstName} ${user.lastName}`,
                email: user.email, 
                _id: user._id
            }
            const token = jwt.sign(userForToken,config.JWT_SECRET,{expiresIn:"24h"});
            return res.status(200).json({result:userForToken, token});
        } 
        return res.status(404).json({error:"wrong user name or password"});
    } catch (error) {
        return res.status(400).json({error});
    }
};


export const signInWithGoogle = async (req,res) => {
    const body = req.body;
    if(!body.idToken){
        res.status(400).json('invalid idToken');
    }
    try {
        const payload = await verify(body.idToken);
        if(!payload){
            return res.status(400).json('login with google failed')
        }
        let user = await User.findOne({$or:[
            {email:payload.email},
            {'googleInfo.email':payload.email},
            {'googleInfo.id':payload.sub}
        ]});
        if(!user){
            user = new User({
                email:payload.email,
                firstName:payload.given_name,
                lastName:payload.given_name,
                googleInfo:{
                    id:payload.sub,
                    token:body.idToken,
                    imageUrl:payload.picture, 
                    email_verified:payload.email_verified,  
                    locale:payload.locale
                }
            })
            await user.save();
        }else{
            if(!user.googleInfo){
                user.googleInfo = {
                    id:payload.sub,
                    token:body.idToken,
                    imageUrl:payload.picture, 
                    email_verified:payload.email_verified,  
                    locale:payload.locale
                }
            }else{
                user.googleInfo.token = body.idToken
                user.googleInfo.imageUrl = payload.picture
                user.googleInfo.locale = payload.locale
            }
            await user.save();
        }
        const userForToken = {
            name:`${user.firstName} ${user.lastName}`,
            email: user.email, 
            _id: user._id,
            imageUrl:user.imageUrl?user.imageUrl:user.googleInfo.imageUrl   
        }

        const token = jwt.sign(userForToken,config.JWT_SECRET,{expiresIn:"24h"});
        return res.status(200).json({result:userForToken, token});
    } catch (error) {
        return res.status(400).json('login with google failed');
    }
}