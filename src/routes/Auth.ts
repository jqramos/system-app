import {Router} from "express";
import AuthController from 'src/controller/AuthController';
import {body} from "express-validator";

const router = Router();

router.post('/login', [
    body('username').not().isEmpty(),
    body('password').not().isEmpty()
], AuthController.login);

router.post('/register', [
    body('username').not().isEmpty(),
    body('password').not().isEmpty(),
    body('email').not().isEmpty().isEmail(),
], AuthController.register);

export default router;