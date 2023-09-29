const { z } = require('zod');

exports.registerSchema = z.object({
    Nombre: z.string({
        required_error: "Username is a required field"
    }),
    Email: z.string({
        required_error: "Email address is a required field"
    }).email({
        message: "Invalid Email Address"
    }),
    Contrasena: z.string({
        required_error: 'Password is required field '
    }).min(6, {
        message: 'Password must be at least  6 characters long'
    })
});

exports.loginSchema = z.object({
    Email: z.string({
        required_error: "Email address is a required field"
    }).email({
        message: "Invalid Email Address"
    }),
    Contrasena: z.string({
        required_error: 'Password is required field '
    }).min(6, {
        message: 'Password must be at least  6 characters long'
    })
});
