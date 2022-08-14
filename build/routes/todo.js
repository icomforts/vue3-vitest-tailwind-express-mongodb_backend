"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todo_1 = require("../controllers/todo");
const router = express_1.default.Router();
//create a new todo
router.post('/', todo_1.createTodo);
//get all the todo
router.get('/:userId', todo_1.getTodoByUserId);
//update todo by id
router.put('/:id', todo_1.updateTodoById);
//delete todo by id
router.delete('/:id', todo_1.deleteTodoById);
exports.default = router;
