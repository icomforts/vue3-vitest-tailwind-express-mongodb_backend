import { Request, Response } from 'express';
import { ITodo } from '../types/todo';
import Todo from '../models/todo';

//create a new todo
export const createTodo = async (req: Request, res: Response) => {
    try {
        const todo: ITodo = req.body;
        const newTodo = new Todo(todo);
        const savedTodo = await newTodo.save();
        res.status(200).json({ todo: savedTodo });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
//get todo by userId
export const getTodoByUserId = async (req: Request, res: Response) => {
    try {
        const todos = await Todo.find({ userId: req.params.userId });
        res.status(200).json({ todos });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

//update todo by id
export const updateTodoById = async (req: Request, res: Response) => {
    try {
        const todo: ITodo = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, todo, { new: true });
        res.status(200).json({ todo: updatedTodo });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
//delete todo by id
export const deleteTodoById = async (req: Request, res: Response) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: '刪除成功' });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
