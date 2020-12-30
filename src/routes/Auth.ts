import {Router} from "express";
import AuthController from 'src/controller/AuthController';
import {body} from "express-validator";
const authController  = new AuthController();
const router = Router();

router.post('/login', [
    body('username').not().isEmpty(),
    body('password').not().isEmpty()
], authController.login);

router.post('/register', [
    body('username').not().isEmpty(),
    body('password').not().isEmpty(),
    body('email').not().isEmpty().isEmail(),
], authController.register);

router.post('/refresh', authController.refreshToken)

export default router;