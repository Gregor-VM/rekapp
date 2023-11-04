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

export const loginAsGuest : RequestHandler = async (req, res) => {

    let guestNumber: string;

    const match = await User.find({username: {$regex: 'Guest', $options: 'i'}});
    if(!match) guestNumber = '0000';
    else {
        guestNumber = ("0000" + match.length.toString(10)).slice(-4);
    }

    const username = 'Guest' + guestNumber;
    const email = `guest${guestNumber}@rekapp.com`;
    const password = Date.now().toString();
    
    const hash = await User.encryptPassword(password);
    const registeredUser = await (new User({username, password: hash, email})).save();
    const token = jwt.sign({id: registeredUser._id}, config.SECRET, {expiresIn: 86400 * 5});
    res.json({token});

}