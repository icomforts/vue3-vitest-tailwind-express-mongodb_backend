import mongoose, { Schema } from 'mongoose';
import { ITodo } from '../types/todo';

export interface ITodoModel extends ITodo {}

const TodoSchema: Schema = new Schema(
    {
        userId: { type: String, required: true },
        title: { type: String, required: true },
        isCompleted: { type: Boolean, required: true }
    },
    { timestamps: true }
);

export default mongoose.model<ITodoModel>('Todo', TodoSchema);
