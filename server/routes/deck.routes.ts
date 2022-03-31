import {Router} from 'express';
import verifyToken from '../middlewares/verifyToken';
import {protectedGet, createDeck, getDecks, getDeck, deleteAllDecks, deleteDeckById,
        getCards, createCard, deleteCardById, shareDeckByEmail, updateDeckInfo, updateCard,
        updateUserInfo, changePassword, getUserInfo} from '../controllers/deck.controller';

const router = Router();

router.use(verifyToken);

router.get("/protected", protectedGet);

// GET USER INFO

router.get("/user-info", getUserInfo);

// CONFIG ROUTES

router.put("/update-user-info", updateUserInfo);

router.put("/change-password", changePassword);

// DECKS ROUTES

router.get("/decks", getDecks);

router.get("/deck/:id", getDeck);

router.post("/deck", createDeck);

router.put("/deck/:deckId", updateDeckInfo);

router.delete("/deck/:id", deleteDeckById);

router.delete("/decks", deleteAllDecks);

// CARDS ROUTES

router.get("/cards/:deckId", getCards);

router.post("/card/:deckId", createCard);

router.put("/card/:deckId/:cardId", updateCard);

router.delete("/card/:deckId/:cardId", deleteCardById);

//SHARE DECK ROUTES

router.post("/deck/share/:email/:deckId", shareDeckByEmail);

export default router;