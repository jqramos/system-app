import {Role} from "@entities/User";

export default class Utility {

    static validateEmail(email: any) {
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(email)
    };

    static isAdmin(role: any) {
        return role === Role.admin;
    }
}
