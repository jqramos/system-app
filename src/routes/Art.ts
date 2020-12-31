import {Router} from 'express';
import {body} from 'express-validator';
import ArtController from 'src/controller/ArtController';
import AuthController from "src/controller/AuthController";

const authController  = new AuthController();
const artController  = new ArtController();
const router = Router();

router.post('/', [
    authController.authenticateJWT,
    body('title').not().isEmpty(),
    body('desc').not().isEmpty(),
    body('url').not().isEmpty(),
    body('category').not().isEmpty().matches(/\b(?:ORIGINAL|FANART|COMMISSIONED)\b/)
], artController.create);

router.get('/:id', artController.findById);
router.post('/search', artController.search);

router.delete('/:id',[
    authController.authenticateJWT
], artController.delete);

router.patch('/:id', [
    authController.authenticateJWT,
    body('title').not().isEmpty(),
    body('desc').not().isEmpty(),
    body('url').not().isEmpty(),
    body('category').not().isEmpty().matches(/\b(?:ORIGINAL|FANART|COMMISSIONED)\b/)
], artController.update);

export default router;
