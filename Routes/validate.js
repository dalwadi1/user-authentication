import Joi from 'joi'

const validateUser = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    password: Joi.string().min(8),

    conformpassword: Joi.ref('password'),
})

const loginValidate = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    password: Joi.string().min(8),
})

const forgotpass = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),


    password: Joi.string().min(8).message("password must be required"),

    conformpassword: Joi.ref('password'),
})

export default { validateUser, loginValidate, forgotpass }