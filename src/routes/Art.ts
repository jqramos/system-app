import {Request, Response, Router} from 'express';
import {body, validationResult} from 'express-validator';
import ArtController from 'src/controller/ArtController';

const router = Router();

router.post('/', ArtController.create);

router.get('/:id', ArtController.findById);

export default router;
