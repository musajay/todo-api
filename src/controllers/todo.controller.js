const prisma = require('../prismaClient');

exports.getTodos = async (req, res, next) => {
  try{
    const todos = await prisma.todo.findMany({ where: { userId: req.userId } });
  res.json(todos);
  } catch (err) {
    next(err);
  }
};

exports.createTodo = async (req, res, next) => {
try{

  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  const todo = await prisma.todo.create({
    data: { title, userId: req.userId }
  });
  res.status(201).json(todo);
} catch (err) {
  next(err);
}
};

exports.updateTodo = async (req, res) => {
try {
  const { id } = req.params;
  const { title, completed } = req.body;

  const todo = await prisma.todo.findUnique({ where: { id: Number(id) } });
  if (!todo || todo.userId !== req.userId)
    return res.status(404).json({ error: 'Todo not found' });

  const updated = await prisma.todo.update({
    where: { id: Number(id) },
    data: { title, completed }
  });
  res.json(updated);
} catch (err) {
  next(err);
}

};

exports.deleteTodo = async (req, res) => {
try{
  const { id } = req.params;

  const todo = await prisma.todo.findUnique({ where: { id: Number(id) } });
  if (!todo || todo.userId !== req.userId)
    return res.status(404).json({ error: 'Todo not found' });

  await prisma.todo.delete({ where: { id: Number(id) } });
  res.json({ message: 'Todo deleted' });
} catch (err) {
  next(err);
}
};