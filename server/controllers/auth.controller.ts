import User from '../models/User';
import jwt from 'jsonwebtoken';

import {RequestHandler} from 'express';
import config from '../config';

export const register : RequestHandler = async (req, res) => {

    const {username, email, password} : 
    {username: string, email: string, password:  string}
     = req.body;
    
    const hash = await User.encryptPassword(password);
    const registeredUser = await (new User({username, password: hash, email})).save();
    const token = jwt.sign({id: registeredUser._id}, config.SECRET, {expiresIn: 86400 * 5});
    res.json({token});

};

export const login : RequestHandler = async (req, res) => {
    1
    const {email, password} : {email: string, password:  string} = req.body;

    const match = await User.findOne({email});
    if(!match) return res.json({error: "This email doesn't exists"});
    const hash = match.password;
    const correctPassword = await User.verifyPassword(password, hash);
    if(correctPassword){
        const token = jwt.sign({id: match._id}, config.SECRET, {expiresIn: 86400 * 5});
        return res.json({token});
    }
    else return res.json({error: "Incorrect password"});
}