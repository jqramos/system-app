import {Request, Response, Router} from 'express';
import {ArtService} from "../services/art/Art.service";
import {body, validationResult} from 'express-validator';

const router = Router();

const artService  = new ArtService();

router.post('/', [
    body('title').not().isEmpty(),
    body('desc').not().isEmpty(),
    body('url').not().isEmpty(),
    body('category').not().isEmpty()
],(req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    return artService.create(req, res);
});

router.get('/:id', (req: Request, res: Response) => {
    return artService.findById(req, res);
});

export default router;
