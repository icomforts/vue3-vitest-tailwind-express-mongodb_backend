"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodoById = exports.updateTodoById = exports.getTodoByUserId = exports.createTodo = void 0;
const todo_1 = __importDefault(require("../models/todo"));
//create a new todo
const createTodo = async (req, res) => {
    try {
        const todo = req.body;
        const newTodo = new todo_1.default(todo);
        const savedTodo = await newTodo.save();
        res.status(200).json({ todo: savedTodo });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
exports.createTodo = createTodo;
//get todo by userId
const getTodoByUserId = async (req, res) => {
    try {
        const todos = await todo_1.default.find({ userId: req.params.userId });
        res.status(200).json({ todos });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
exports.getTodoByUserId = getTodoByUserId;
//update todo by id
const updateTodoById = async (req, res) => {
    try {
        const todo = req.body;
        const updatedTodo = await todo_1.default.findByIdAndUpdate(req.params.id, todo, { new: true });
        res.status(200).json({ todo: updatedTodo });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
exports.updateTodoById = updateTodoById;
//delete todo by id
const deleteTodoById = async (req, res) => {
    try {
        await todo_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: '刪除成功' });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
exports.deleteTodoById = deleteTodoById;
