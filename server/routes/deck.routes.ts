import {Router} from 'express';
import verifyToken from '../middlewares/verifyToken';
import {protectedGet, createDeck, getDecks, pullAllDecks, deleteDeckById} from 
'../controllers/deck.controller'

const router = Router();

router.use(verifyToken);

router.get("/protected", protectedGet);

router.get("/decks", getDecks);

router.post("/create-deck", createDeck);

router.delete("/delete-deck/:id", deleteDeckById);

router.delete("/delete-all-decks", pullAllDecks);

export default router;