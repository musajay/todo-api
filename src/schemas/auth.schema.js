const{ z } = require('zod');

exports.registerSchema = z.object({
    email: z.string()
    .min(1, 'Email is required')
    .email('invalid email format')
    .trim()
    .toLowerCase(),
    password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one symbol')
});

exports.loginSchema = z.object({
    email: z.string()
    .min(1, 'Email is required')
    .email('Invald email format')
    .trim()
    .toLowerCase(),
    password: z.string()
    .min(1, 'Password is required')
});