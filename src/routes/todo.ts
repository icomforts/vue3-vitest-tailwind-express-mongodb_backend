import express from 'express';
import { createTodo, getTodoByUserId, updateTodoById, deleteTodoById } from '../controllers/todo';
const router = express.Router();

//create a new todo
router.post('/', createTodo);
//get all the todo
router.get('/:userId', getTodoByUserId);
//update todo by id
router.put('/:id', updateTodoById);
//delete todo by id
router.delete('/:id', deleteTodoById);

export default router;
