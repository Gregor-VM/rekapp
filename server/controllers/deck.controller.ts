import {Request, RequestHandler} from 'express';
import { Card } from '../interface';
import User from '../models/User';

interface UserRequest extends Request{
    userId: string
}

interface UserShared {
    email: string
    username: string
    profileImg: string
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
    if(cardIndex === -1) return res.sendStatus(404);

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


//share

export const getShareDeck : RequestHandler = async (req: UserRequest, res) => {
    const deckId = (req.params.deckId as string);

    const thisUser = await User.findById(req.userId);
    const sharedItem = thisUser.sharedWithMe.find(item => item.deckId === deckId);
    const user = await User.findById(sharedItem.author);
    
    const deck = user.decks.find(deck => deck._id.toString() === deckId);
    if(deck.shareWith.includes(thisUser._id.toString())) res.json(deck);
    else res.sendStatus(401);
}

export const shareDeckByEmail : RequestHandler = async (req: UserRequest, res) => {
    const email = req.params.email as string;
    const deckId = req.params.deckId as string;

    const user = await User.findById(req.userId);
    const userEmail = user.email;
    const deckIndex = user.decks.findIndex(deck => deck._id.toString() === deckId);

    const data = await User.findOne({email: email});


    if(userEmail !== email){
        data.sharedWithMe.push({author: req.userId, deckId});
        await data.save();
        user.decks[deckIndex].shareWith.push(data._id.toString());
        await user.save();
        res.sendStatus(200);
    }else{
        res.sendStatus(406);
    }
}



export const deleteShareEmail : RequestHandler = async (req: UserRequest, res) => {
    const email = req.params.email as string;
    const deckId = req.params.deckId as string;

    const user = await User.findById(req.userId);
    const userEmail = user.email;
    const deckIndex = user.decks.findIndex(deck => deck._id.toString() === deckId);

    const data = await User.findOne({email: email});


    if(userEmail !== email){
        const sharedWithMeIndex = data.sharedWithMe.findIndex(item => item.deckId === deckId);
        data.sharedWithMe.splice(sharedWithMeIndex, 1);
        await data.save();
        const emailSharedIndex = user.decks[deckIndex].shareWith.findIndex(item => item === data._id.toString());
        user.decks[deckIndex].shareWith.splice(emailSharedIndex, 1);
        await user.save();
        res.sendStatus(204);
    }else{
        res.sendStatus(406);
    }
}

 

export const getSharedEmails : RequestHandler = async (req: UserRequest, res) => {
    const deckId = req.params.deckId as string;    

    const user = await User.findById(req.userId);
    const deck = user.decks.find(deck => deck._id.toString() === deckId);
    let usersData : UserShared[] = [];

    for(let i=0;i<deck.shareWith.length;i++){
        const userShared = await User.findById(deck.shareWith[i]);
        usersData.push({email: userShared.email, username: userShared.username, profileImg: userShared.profileImg});
    }
    res.json(usersData);
}

export const getSharedDecks : RequestHandler = async (req: UserRequest, res) => {
    const user = await User.findById(req.userId);
    let sharedDecks = [];
    for(let i=0;i<user.sharedWithMe.length;i++){
        const deck = (await User.findById(user.sharedWithMe[i].author)).decks.find(deck => deck._id.toString() === user.sharedWithMe[i].deckId);
        sharedDecks.push(deck);
    };
    res.json(sharedDecks)
}

//settings

export const updateUserInfo : RequestHandler = async (req: UserRequest, res) => {
    const {username: newUsername, email: newEmail, profileImg} : {username: string, email: string, profileImg: string} = req.body;

    const user = await User.findById(req.userId);

    if(newUsername.length < 3 || newEmail.length < 6 || !newEmail.includes("@")){
        return res.sendStatus(400)
    };

    user.username = newUsername;
    user.email = newEmail;
    if(profileImg){
        user.profileImg = profileImg;
    }

    await user.save();

    res.sendStatus(200);

}

export const changePassword : RequestHandler = async (req: UserRequest, res) => {

    const {oldPassword, newPassword} : {oldPassword: string, newPassword: string} = req.body;

    if(newPassword.length < 6) return res.sendStatus(400);

    const user = await User.findById(req.userId);
    const oldPasswordHash = user.password;

    const match = await User.verifyPassword(oldPassword, oldPasswordHash);

    if(match){

        const newPasswordHash = await User.encryptPassword(newPassword);
        user.password = newPasswordHash;
        await user.save();

        return res.sendStatus(200);
    } else {
        return res.sendStatus(401)
    }



}

export const getUserInfo : RequestHandler = async (req: UserRequest, res) => {
    const user = await User.findById(req.userId);
    const userInfo = {username: user.username, email: user.email, profileImg: user.profileImg};
    res.json(userInfo);
}

export const deleteAccount : RequestHandler = async (req: UserRequest, res) => {
    const user = await User.findById(req.userId);
    await user.delete();
    res.sendStatus(204);
}