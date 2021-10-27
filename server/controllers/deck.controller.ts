import {Request, RequestHandler} from 'express';
import User from '../models/User';

interface UserRequest extends Request{
    userId: string
}

export const protectedGet : RequestHandler = async (req, res) => {
    res.json({msg: "Protected Route"});
}

export const createDeck : RequestHandler = async (req : UserRequest, res) => {
    const {name, backgroundColor, backgroundImage} : {
        name: string, backgroundColor: string, backgroundImage: string
    } = req.body;

    const deck = {name, backgroundColor, backgroundImage, options: {}};

    const response = await User.findByIdAndUpdate(req.userId, {$push: {decks: deck}},
    {new: true});

    res.json(response.decks[response.decks.length - 1]);
}

export const deleteDeckById : RequestHandler = async (req: UserRequest, res) => {
    const id = (req.params.id as string);
    await User.findByIdAndUpdate(req.userId, {$pull: {decks: {"_id":id}}});
    return res.status(204);
}

export const pullAllDecks : RequestHandler = async (req : UserRequest, res) => {
    //const response = await User.findByIdAndUpdate(req.userId, {$pullAll: {decks: }});
    const response = await User.findByIdAndUpdate(req.userId, {$set: {decks: []}});
    res.json(response);
}

export const getDecks : RequestHandler = async (req : UserRequest, res) => {
    const response = await User.findById(req.userId, {decks: 1});
    res.json(response.decks);
}