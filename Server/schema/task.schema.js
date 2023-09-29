const { z } = require('zod');

exports.createTaskSchema = z.object({
    title: z.string({
        required_error: 'Title is Required',
    }),
    description: z.string({
        required_error: 'Description is required'
    }),
    date: z.string().datetime().optional()
});