import {Request, RequestHandler} from 'express';
import User from '../models/User';

interface UserRequest extends Request{
    userId: string
}



export const protectedGet : RequestHandler = async (_req, res) => {
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

export const deleteAllDecks : RequestHandler = async (req : UserRequest, res) => {
    //const response = await User.findByIdAndUpdate(req.userId, {$pullAll: {decks: }});
    const response = await User.findByIdAndUpdate(req.userId, {$set: {decks: []}});
    res.json(response);
}

export const getDecks : RequestHandler = async (req : UserRequest, res) => {
    const response = await User.findById(req.userId, {decks: 1});
    res.json(response.decks);
}





export const getCards : RequestHandler = async (req: UserRequest, res) => {
    const deckId = (req.params.deckId as string);
    const result = await User.findById(req.userId, {decks: {_id: deckId}, _id:0});
    res.json(result.decks[0].cards);
}

export const createCard : RequestHandler = async (req: UserRequest, res) => {
    const deckId = (req.params.deckId as string);
    const card : {front: string, back: string, _id: undefined} = req.body;

    const data = await User.findById(req.userId);
    const index = data.decks.findIndex(deck => deck._id.toString() === deckId);
    data.decks[index].cards.push(card);
    const result = await data.save();

    res.json(data.decks[index].cards[data.decks[index].cards.length - 1]);

}

export const deleteCardById : RequestHandler = async (req: UserRequest, res) => {
    const deckId = (req.params.deckId as string);
    const cardId = (req.params.cardId as string);

    const data = await User.findById(req.userId);

    const index = data.decks.findIndex(deck => deck._id.toString() === deckId);
    const cardIndex = data.decks[index].cards.findIndex(card => card._id.toString() === cardId);
    data.decks[index].cards.splice(cardIndex, 1);
    await data.save();
    res.status(204);
}