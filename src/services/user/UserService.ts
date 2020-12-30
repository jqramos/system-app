import UserRepository from "../../repositories/UserRepository";
import Logger from 'jet-logger';
import {Request, Response} from 'express';
import {StatusCodes} from "http-status-codes";
import {IUser} from "@entities/User";
import {Observable} from "rxjs";
import * as jwt from "jsonwebtoken";
import 'dotenv/config';

const { BAD_REQUEST, CREATED, OK,  } = StatusCodes;

const accessTokenSecret = `${process.env.ACCESS_TOKEN}`;
const accessTokenLife = `${process.env.ACCESS_TOKEN_LIFE}`;
const refreshTokenSecret = `${process.env.REFRESH_TOKEN}`;
const refreshTokenLife = `${process.env.REFRESH_TOKEN_LIFE}`;
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
                    const userService = new UserService();
                    if (data) {
                        return userService.generateToken(req, res, data);
                    }
                });
            }
        })
    }

    public generateToken(req: Request, res: Response, data: any): any {
        // Generate an access token
        const accessToken = jwt.sign({ username: data.username,  role: data.role },
            accessTokenSecret, {
                algorithm: "HS256",
                expiresIn: accessTokenLife
            });
        let refreshToken = jwt.sign({ username: data.username,  role: data.role },
            refreshTokenSecret, {
                algorithm: "HS256",
                expiresIn: refreshTokenLife
            })
        res.json({
            accessToken,
            refreshToken
        });
        res.send();
    }
}
