import {Request, RequestHandler} from 'express';
import { Card, Deck } from '../interface';
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

    const deck = {name, shared: {value: false, author: ""}, backgroundColor, backgroundImage, options: {}};

    const response = await User.findByIdAndUpdate(req.userId, {$push: {decks: deck}},
    {new: true});

    res.json(response.decks[response.decks.length - 1]);
}

export const deleteDeckById : RequestHandler = async (req: UserRequest, res) => {
    const id = (req.params.id as string);
    //await User.findByIdAndUpdate(req.userId, {$pull: {decks: {"_id":id}}});
    const userData = await User.findById(req.userId);
    const index = userData.decks.findIndex(deck => deck._id.toString() === id);
    if(index === -1) return res.sendStatus(404);
    userData.decks.splice(index, 1);
    await userData.save();
    return res.sendStatus(204);
}

export const deleteAllDecks : RequestHandler = async (req : UserRequest, res) => {
    //const response = await User.findByIdAndUpdate(req.userId, {$pullAll: {decks: }});
    const response = await User.findByIdAndUpdate(req.userId, {$set: {decks: []}});
    res.status(204).json(response);
}

export const getDecks : RequestHandler = async (req : UserRequest, res) => {
    const response = await User.findById(req.userId, {decks: {cards: 0}});
    res.json(response.decks);
}

export const getDeck : RequestHandler = async (req: UserRequest, res) => {
    const id = (req.params.id as string);
    const response = await User.findById(req.userId);
    const deck = response.decks.find(deck => deck._id.toString() === id);
    res.json(deck);
}


export const updateDeckInfo : RequestHandler = async (req: UserRequest, res) => {

    const updatedDeck : {
        name: string, backgroundColor: string, backgroundImage: string, options: any
    } = req.body;

    const deckId = (req.params.deckId as string);

    const user = await User.findById(req.userId);
    const index = user.decks.findIndex(deck => deck._id.toString() === deckId);
    user.decks[index] = {...user.decks[index], ...updatedDeck, cards: user.decks[index].cards, _id: user.decks[index]._id};

    await user.save();

    res.sendStatus(200);
}

export const updateCard : RequestHandler = async (req: UserRequest, res) => {
    const updatedCard : Card = req.body;
    const deckId = (req.params.deckId as string);
    const cardId = (req.params.cardId as string);

    const data = await User.findById(req.userId);

    const index = data.decks.findIndex(deck => deck._id.toString() === deckId);
    if(index === -1) return res.sendStatus(404);
    const cardIndex = data.decks[index].cards.findIndex(card => card._id.toString() === cardId);

    data.decks[index].cards[cardIndex] = {_id: data.decks[index].cards[cardIndex]._id, ...updatedCard};
    await data.save();

    res.sendStatus(200);

}


export const getCards : RequestHandler = async (req: UserRequest, res) => {
    const deckId = (req.params.deckId as string);
    
    const result = await User.findById(req.userId);
    const cards = (result.decks.find((deck) => deck._id.toString() === deckId)).cards;

    res.json(cards);
}

export const createCard : RequestHandler = async (req: UserRequest, res) => {
    const deckId = (req.params.deckId as string);
    const card : Card = req.body;

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
    if(index === -1) return res.sendStatus(404);
    const cardIndex = data.decks[index].cards.findIndex(card => card._id.toString() === cardId);
    data.decks[index].cards.splice(cardIndex, 1);
    await data.save();
    res.sendStatus(204);
}

export const shareDeckByEmail : RequestHandler = async (req: UserRequest, res) => {
    const email = req.params.email as string;
    const deckId = req.params.deckId as string;

    const user = await User.findById(req.userId);
    const userEmail = user.email;
    const deck = user.decks.find(deck => deck._id.toString() === deckId);

    const data = await User.findOne({email: email});


    if(userEmail !== email){
        data.decks.push({...deck, shared: {value: true, author: req.userId}});
        await data.save();
        res.sendStatus(200);
    }else{
        res.sendStatus(406);
    }
}
