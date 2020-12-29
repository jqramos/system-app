import {Request, Response, Router} from 'express';
import {body, validationResult} from 'express-validator';
import ArtController from 'src/controller/ArtController';

const router = Router();

router.post('/', [
    body('title').not().isEmpty(),
    body('desc').not().isEmpty(),
    body('url').not().isEmpty(),
    body('category').not().isEmpty().matches(/\b(?:ORIGINAL|FANART|COMMISSIONED)\b/)
],ArtController.create);

router.get('/:id', ArtController.findById);

export default router;
