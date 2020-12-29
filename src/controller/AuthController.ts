import {NextFunction, Request, Response} from "express";
import * as jwt from "jsonwebtoken";
import {IUser} from "@entities/User";
import {UserService} from "../services/user/UserService";
import {validationResult} from "express-validator";

const accessTokenSecret = `${process.env.ACCESS_TOKEN}`;
const userService = new UserService();

class AuthController{
    public static authenticateJWT(req: Request, res: Response, next: NextFunction){
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const token = authHeader.split(' ')[1];

            jwt.verify(token, accessTokenSecret, (err, user) => {
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

    public static login(req: Request, res: Response){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        return userService.login(req, res);
    }

    public static register(req: Request, res: Response){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        return userService.registerUser(req, res);
    }
}

export default AuthController;