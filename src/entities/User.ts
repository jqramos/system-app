import mongoose from "mongoose";
import Utility from "@shared/utility";
import * as bcrypt from "bcrypt";


const SALT_WORK_FACTOR = 10;
const { Schema } = mongoose;
export enum Role {
    guest,
    admin
}

export interface IUser extends mongoose.Document{
    _id?: String;
    username: String;
    password: String;
    email: String;
    role: String;
    createdDate: Date;
    lastLogin: Date | undefined;
    is_deleted?: Boolean;
}

const schema  = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        validate: {
            validator: function(v) {
                return Utility.validateEmail(v);
            },
            message: props => `${props.value} is not a valid email!`
        },
        required: true
    },
    createdDate: { type: Date, default: Date.now },
    lastLogin: { type: Date, default: Date.now },
    role: {
        type: String,
        enum: ['guest', 'admin'],
        default: 'guest',
        required: true
    }
});

schema.pre<IUser>('save', function(next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

schema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const User = mongoose.model('User', schema );

export default User;
