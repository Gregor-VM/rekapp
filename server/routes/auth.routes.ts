import {Router} from 'express';
import {register, login, loginAsGuest} from '../controllers/auth.controller'

const router = Router();

//REGISTER

router.post("/register", register);

//LOGIN

router.post("/login", login);

//LOGINGUEST

router.post("/login-guest", loginAsGuest);

export default router;