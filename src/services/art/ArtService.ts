import {IArt} from "@entities/Art";
import ArtRepository from "../../repositories/ArtRepository";
import Logger from 'jet-logger';
import {Request, Response} from 'express';
import {StatusCodes} from "http-status-codes";

const { BAD_REQUEST, CREATED, OK,  } = StatusCodes;

export class ArtService {
    private artRepository: ArtRepository = new ArtRepository();

    public create(req: Request, res: Response) {
        let art_params: IArt = {
            title: req.body.title,
            date: new Date(),
            url: req.body.url,
            desc: req.body.desc,
            category: req.body.category
        }
        this.artRepository.create(art_params, (err: any, data: IArt) => {
            if (err) {
                Logger.Err(err);
                Logger.Err(res);
                return res.status(OK).json(err);
            } else {
                Logger.Info('get art successful' + data);
                return res.status(OK).json(data);
            }
        });
    }

    public findById(req: Request, res: Response) {
        this.artRepository.findById(req.params.id, (err: any, data: IArt) => {
            if (err) {
                Logger.Err(err);
                Logger.Err(res);
                return res.status(OK).json(err);
            } else {
                Logger.Info('get art successful' + data);
                return res.status(OK).json(data);
            }
        });
    }




}
