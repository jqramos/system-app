import {IArt} from "@entities/Art";
import ArtRepository from "../../repositories/ArtRepository";
import Logger from 'jet-logger';
import {Request, Response} from 'express';
import {StatusCodes} from "http-status-codes";
import {PaginateModel} from "mongoose";
import {removeTmpFile} from "@shared/utility";
import {Storage} from "@google-cloud/storage";
import * as fs from "fs";

const { BAD_REQUEST, CREATED, OK,  } = StatusCodes;
const storage = new Storage({
    projectId: `${process.env.PROJECT_ID}`,
    keyFilename: `${process.env.KEY_PATH}`
});

export class ArtService {
    private artRepository: ArtRepository = new ArtRepository();

    public async create(req: Request, res: Response) {
        let art_params: IArt = {
            title: req.body.title,
            date: new Date(),
            url: req.body.url,
            desc: req.body.desc,
            category: req.body.category
        }
        try {
            const results =  await storage.bucket(`${process.env.BUCKET}`).upload(req.file.path, {
                gzip: true,
                metadata: {
                    cacheControl: 'public, max-age=31536000'
                },
                destination: `${process.env.BUCKET_DIR}/${req.file.filename}`
            });
            console.log(results);
        } catch (err) {
            console.error('ERROR:', err);
            return res.status(400).json(err);
        }
        this.artRepository.create(art_params, (err: any, data: IArt) => {
            removeTmpFile(req.file.path);
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

    public update(req: Request, res: Response) {
        let art_params: IArt = {
            title: req.body.title,
            date: new Date(),
            url: req.body.url,
            desc: req.body.desc,
            category: req.body.category
        }
        this.artRepository.update(req.params.id, art_params, (err: any, data: IArt) => {
            if (err) {
                Logger.Err(err);
                Logger.Err(res);
                return res.status(OK).json(err);
            } else {
                Logger.Info('update art successful' + data);
                return res.status(OK);
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

    public delete(req: Request, res: Response) {
        this.artRepository.delete(req.params.id, (err: any, data: IArt) => {
            if (err) {
                Logger.Err(err);
                Logger.Err(res);
                return res.status(OK).json(err);
            } else {
                Logger.Info('delete art successful' + data);
                return res.status(OK);
            }
        });
    }

    public search(req: Request, res: Response) {
        const options = {
            page: req.query.page ? req.query.page : 1,
            limit: 9,
            sort: {date: '-1'},
            collation: {
                locale: 'en',
            },
        };
        this.artRepository.search({}, options,(err: any, data: PaginateModel<any>) => {
            if (err) {
                Logger.Err(err);
                Logger.Err(res);
                return res.status(OK).json(err);
            } else {
                return res.status(OK).json(data);
            }
        });
    }

    public uploadFile() {

    }

}
