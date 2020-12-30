import {NextFunction, Request, Response} from "express";
import * as jwt from "jsonwebtoken";
import {IUser} from "@entities/User";
import {UserService} from "../services/user/UserService";
import {validationResult} from "express-validator";

const accessTokenSecret = `${process.env.ACCESS_TOKEN}`;
const refreshTokenSecret = `${process.env.REFRESH_TOKEN}`;
const userService = new UserService();

class AuthController{
    public authenticateJWT(req: Request, res: Response, next: NextFunction){
        const authHeader = req.headers.authorization;
        if (authHeader) {
            jwt.verify(authHeader, accessTokenSecret, (err, user) => {
                if (err) {
                    return res.sendStatus(403);
                }
                req.body.user = user;
                next();
            });
        } else {
            res.sendStatus(401);
        }
    };

    public refreshToken(req: Request, res: Response){
        const authHeader = req.headers.authorization;
        if (authHeader) {
            jwt.verify(authHeader, refreshTokenSecret, (err, user) => {
                if (err) {
                    return res.sendStatus(400);
                }
                req.body.user = user;
                const userService = new UserService();
                return userService.generateToken(req, res, user);
            });
        } else {
            res.sendStatus(401);
        }
    }


    public login(req: Request, res: Response){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        return userService.login(req, res);
    }

    public register(req: Request, res: Response){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        return userService.registerUser(req, res);
    }
}

export default AuthController;