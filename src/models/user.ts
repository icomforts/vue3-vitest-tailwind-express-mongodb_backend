import mongoose, { Schema } from 'mongoose';
import { IUser } from '../types/user';

export interface IUserModel extends IUser {}

const UserSchema: Schema = new Schema(
    {
        password: { type: String, required: true },
        email: { type: String, required: true },
        username: { type: String },
        avatar: { type: String }
    },
    { timestamps: true }
);

export default mongoose.model<IUserModel>('User', UserSchema);
