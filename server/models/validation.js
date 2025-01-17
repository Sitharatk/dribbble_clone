import Joi from 'joi';

const joiUserSchema = Joi.object({
    name:Joi.string(),
    email:Joi.string().email().required(),
    password:Joi.string().min(6).required(),
    username:Joi.string().required(),
})



export default joiUserSchema 