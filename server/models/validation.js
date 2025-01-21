import Joi from 'joi';

 const joiUserSchema = Joi.object({
    name:Joi.string(),
    email:Joi.string().email().required(),
    password:Joi.string().min(6).required(),
    username:Joi.string().required(),
})



 const joiShotSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    image: Joi.string().uri().required().messages({
        'string.empty': 'Image URL is required',
        'string.uri': 'Image must be a valid URL',
    }),
    tags: Joi.array().items(Joi.string().trim()).messages({
        'array.base': 'Tags must be an array of strings',
    }),
    user: Joi.string(),
    likes: Joi.number().integer().min(0).messages({
        'number.base': 'Likes must be a number',
        'number.integer': 'Likes must be an integer',
        'number.min': 'Likes cannot be less than 0',
    }),
    views: Joi.number().integer().min(0).messages({
        'number.base': 'Views must be a number',
        'number.integer': 'Views must be an integer',
        'number.min': 'Views cannot be less than 0',
    }),
    createdAt: Joi.date().default(Date.now).messages({
        'date.base': 'CreatedAt must be a valid date',
    }),
});

export default { joiUserSchema, joiShotSchema }
