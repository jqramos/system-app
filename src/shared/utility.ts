import {Role} from "@entities/User";
import fs from 'fs';
import multer from 'multer';

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

export const removeTmpFile = (path: string) => {
    fs.unlink(path, (err) => {
        if (err) {
            console.error(err)
            return
        }

        //file removed
    });
};

export const storageConf = () => {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `${process.env.TMP_STORAGE}`)
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, `${uniqueSuffix}-${file.originalname}`);
        }
    });
}