import User, {IUser} from "@entities/User";

export default class UserRepository {

    public findById(id: any, callback: any) {
        User.findById(id, callback);
    }

    public create(params: IUser, callback: any) {
        const _session = new User(params);
        _session.save(callback);
    }

    public deleteById(id: any, callback: any) {
        User.findByIdAndDelete(id, callback);
    }

    public updateById(id: any, user: IUser, callback: any) {
        User.findByIdAndUpdate(id, user, callback);
    }

}
