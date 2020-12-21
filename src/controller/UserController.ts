import { UserService } from "src/services/user/UserService";
import {Request, Response} from 'express';

class UserController {
    private UserService = new UserService;
    public static index(req: Request, res: Response): any {
	}
}
export default UserController;