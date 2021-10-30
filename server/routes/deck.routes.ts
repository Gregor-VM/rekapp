import {Router} from 'express';
import verifyToken from '../middlewares/verifyToken';
import {protectedGet, createDeck, getDecks, getDeck, deleteAllDecks, deleteDeckById,
        getCards, createCard, deleteCardById} from 
'../controllers/deck.controller'

const router = Router();

router.use(verifyToken);

router.get("/protected", protectedGet);

// DECKS ROUTES

router.get("/decks", getDecks);

router.get("/deck/:id", getDeck);

router.post("/deck", createDeck);

router.delete("/deck/:id", deleteDeckById);

router.delete("/decks", deleteAllDecks);

// CARDS ROUTES

router.get("/cards/:deckId", getCards);

router.post("/card/:deckId", createCard);

router.delete("/card/:deckId/:cardId", deleteCardById);

export default router;