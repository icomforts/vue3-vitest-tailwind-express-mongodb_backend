import mongoose, { Schema } from 'mongoose';

export interface ITeam {
    id: string;
    conference: string;
    abbr: string;
    city: string;
    name: string;
}

export interface ITeamModel extends ITeam {}

const Teamschema: Schema = new Schema(
    {
        id: { type: String, required: true },
        conference: { type: String, required: true },
        abbr: { type: String, required: true },
        city: { type: String, required: true },
        name: { type: String, required: true }
    },
    {
        // timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<ITeamModel>('Team', Teamschema);
