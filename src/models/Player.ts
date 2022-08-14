import mongoose, { Schema } from 'mongoose';

export interface IPlayer  {
    displayName: String,
    height: String,
    weight: String,
    jerseyNo: String,
    position: String,
}

export interface IPlayerModel extends IPlayer {}

const Playerschema: Schema = new Schema(
    {
        displayName: { type: String, required: true },
        height: { type: String, required: true },
        weight: { type: String, required: true },
        jerseyNo: { type: String, required: true },
        position: { type: String, required: true }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IPlayerModel>('Player', Playerschema);
