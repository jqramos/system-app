import mongoose from 'mongoose';

const { Schema } = mongoose;
import mongoosePaginate from "mongoose-paginate-v2";


export enum Category {
    ORIGINAL,
    FANART ,
    COMMISSIONED
}

export interface IArt {
    _id?: String;
    title: String;
    date: Date;
    url: String;
    desc: String;
    is_deleted?: Boolean;
    category: Category;
}

export interface IArtDoc extends IArt {
    getCategory(): string;
}

const schema  = new Schema({
    title: String,
    date: { type: Date, default: Date.now },
    url: String,
    desc: String,
    category: {
        type: String,
        enum: ['ORIGINAL', 'FANART', 'COMMISSIONED'],
        default: 'ORIGINAL',
        required: true
    }
});
schema.plugin(mongoosePaginate);
const Art = mongoose.model('Art', schema );

export default Art;
