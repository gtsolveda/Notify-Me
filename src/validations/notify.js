const Joi = require('@hapi/joi')

const notifySchema = {
    
        body: Joi.object({
            fullName : Joi.string().regex(/^[A-Za-z ]+$/).message("wrong credential!!").required(),
            email: Joi.string(),
            phone: Joi.string().regex(/^[0-9]{10}$/).message("wrong credential!!").required(),
            articleID: Joi.string().required(),
            userID: Joi.string().regex(/^[0-9]{6}$/).message("wrong credential!!").required(),
            articleName : Joi.string().regex(/^[A-Za-z ]+$/).message("wrong credential!!").required()


        })
    
}

module.exports = notifySchema