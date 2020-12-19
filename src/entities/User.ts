import mongoose from "mongoose";
const { Schema } = mongoose;
export enum Role {
    guest,
    admin
}

export interface IUser {
    _id?: String;
    username: String;
    password: String;
    email: String;
    role: String;
    createdDate: Date;
    lastLogin: Date;
    is_deleted?: Boolean;
}

const schema  = new Schema({
    username: String,
    password: String,
    email: String,
    createdDate: { type: Date, default: Date.now },
    lastLogin: { type: Date, default: Date.now },
    role: {
        type: String,
        enum: ['guest', 'admin'],
        default: 'guest',
        required: true
    }
});

const User = mongoose.model('User', schema );

export default User;
