import {RequestHandler, Request} from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';
import config from '../config';

import User from '../models/User';

interface TokenPayload extends JwtPayload{
    id: string,
}

interface GetUserRequest extends Request {
    userId: string
}

const verifyToken : RequestHandler = async (req: GetUserRequest, res, next) => {

    try {
        
        const authentication = req.headers["authorization"]
        if(typeof authentication !== "string") return res.json({error: "No token provided"});
        const token = (authentication).replace("Bearer ", "");
        const decodedToken = (jwt.verify(token, config.SECRET) as TokenPayload);   
        
        const currentDate = parseInt(Date.now().toString().slice(0, 10));

        const userId = decodedToken.id;

        if(userId && (decodedToken.exp - currentDate) > 0){
            const exists = await User.exists({_id: userId});
            if(!exists) return res.json({error: "invalid token"});
            req.userId = userId;
            next();
        }

    } catch (error) {
        return res.json({error: "invalid token"});
    }

};

export default verifyToken;