const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const { todoSchema } = require('../schemas/todo.schema')
const { getTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todo.controller');

router.use(protect);

router.get('/', getTodos);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;