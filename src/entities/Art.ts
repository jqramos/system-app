import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface IArt {
    _id?: String;
    title: String;
    name:   String;
    date: Date;
    url: String;
    desc: String;
    is_deleted?: Boolean;
}


const schema  = new Schema({
    title: String,
    name:   String,
    date: { type: Date, default: Date.now },
    url: String,
    desc: String
});
const Art = mongoose.model('Art', schema );

export default Art;
