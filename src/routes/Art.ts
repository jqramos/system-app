
import {Application, Request, Response, Router} from 'express';
import {ArtService} from "../services/Art.service";
const router = Router();

const artService  = new ArtService();

router.post('/', (req: Request, res: Response) => {
    return artService.create(req, res);
});

router.get('/:id', (req: Request, res: Response) => {
    return artService.findById(req, res);
});

export default router;
