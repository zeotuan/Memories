import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 
import config from '../utils/config.js';
import User from '../models/user.js';

export const signUp = async (req, res) => {
    const body = req.body;
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
        res.status(400).json({error:"invalid credential"})
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