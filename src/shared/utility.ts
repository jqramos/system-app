import {Role} from "@entities/User";

export default class Utility {

    static isAdmin(role: any) {
        return role === Role.admin;
    }
}

export const validateEmail = (email: any) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


export const isAdmin = (role: any) => {
    return role === Role.admin;
};