import UserRepository from "../../repositories/UserRepository";
import Logger from 'jet-logger';
import {Request, Response} from 'express';
import {StatusCodes} from "http-status-codes";
import {IUser} from "@entities/User";
import {Observable} from "rxjs";
import * as jwt from "jsonwebtoken";

const { BAD_REQUEST, CREATED, OK,  } = StatusCodes;

const accessTokenSecret = `${process.env.ACCESS_TOKEN}`;
export class UserService {
    private userRepository: UserRepository = new UserRepository();

    public registerUser(req: Request, res: Response) {
        let user: IUser = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            role: 'guest',
            createdDate: new Date()
        }

        this.userRepository.create(user, (err: any, data: IUser) => {
            if (err) {
                Logger.Err(err);
                Logger.Err(res);
                return res.status(OK).json(err);
            } else {
                Logger.Info('get user successful' + data);
                return res.status(CREATED);
            }
        });
    }

    public login(req: Request, res: Response) {
        this.userRepository.findByCreds(req.body.username, (err: any, data: any) => {
            if (err) {
                Logger.Err(err);
                Logger.Err(res);
                return res.status(OK).json(err);
            } else {
                data.comparePassword(req.body.password, function(err: any, isMatch: any) {
                    if (!isMatch) {
                        return res.status(OK).json('Username or password incorrect');
                    }
                    if (data) {
                        // Generate an access token
                        const accessToken = jwt.sign({ username: data.username,  role: data.role }, accessTokenSecret);
                        res.json({
                            accessToken
                        });
                    }
                });
            }
        })
    }
}
