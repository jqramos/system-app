import UserRepository from "../../repositories/UserRepository";
import Logger from 'jet-logger';
import {Request, Response} from 'express';
import {StatusCodes} from "http-status-codes";
import {IUser} from "@entities/User";

const { BAD_REQUEST, CREATED, OK,  } = StatusCodes;

export class UserService {
    private userRepository: UserRepository = new UserRepository();

    public registerUser(req: Request, res: Response) {
        let user: IUser = {
            lastLogin: undefined,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            role: req.body.role,
            createdDate: new Date()
        }

        this.userRepository.create(user, (err: any, data: IUser) => {
            if (err) {
                Logger.Err(err);
                Logger.Err(res);
                return res.status(OK).json(err);
            } else {
                Logger.Info('get user successful' + data);
                return res.status(CREATED).json(data);
            }
        });
    }
}
