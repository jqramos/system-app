
import {Request, Response} from 'express';
import {body, validationResult} from 'express-validator';
import { ArtService } from 'src/services/art/ArtService';

const artService = new ArtService();

class ArtController {

    public static create(req: Request, res: Response): any {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        return artService.create(req, res);
    }
    
    public static findById(req: Request, res: Response): any {       
        return artService.findById(req, res);
    }

}
export default ArtController;