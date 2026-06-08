const { z } = require('zod');

exports.todoSchema = z.object({
    title:z.string()
    .min(1, 'Title is required')
    .max(200, 'Title cannot exceed 200 characters')
    .regex(/^[a-zA-Z0-9 !,\-?.]+$/, 'Title contains invalid characters')
});