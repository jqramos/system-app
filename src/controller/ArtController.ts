
import {Request, Response} from 'express';
import {validationResult} from 'express-validator';
import { ArtService } from 'src/services/art/ArtService';
import {isAdmin, removeTmpFile} from "@shared/utility";

const artService = new ArtService();

class ArtController {

    public create(req: Request, res: Response): any {
        const errors = validationResult(req);
        // if (!isAdmin(req.body.user.role)) {
        //     removeTmpFile(req.file.path);
        //     return res.status(401).json({errors: "Unauthorized"});
        // }
        if (!errors.isEmpty()) {
            removeTmpFile(req.file.path);
            return res.status(400).json({ errors: errors.array() });
        }
        return artService.create(req, res);
    }

    public update(req: Request, res: Response): any {
        const errors = validationResult(req);
        if (!isAdmin(req.body.user.role)) {
            return res.status(401).json({errors: "Unauthorized"});
        }
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        return artService.update(req, res);
    }

    public delete(req: Request, res: Response): any {
        const errors = validationResult(req);
        if (!isAdmin(req.body.user.role)) {
            return res.status(401).json({errors: "Unauthorized"});
        }
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        return artService.delete(req, res);
    }

    public search(req: Request, res: Response): any {
        return artService.search(req, res);
    }
    
    public findById(req: Request, res: Response): any {
        return artService.findById(req, res);
    }

}
export default ArtController;