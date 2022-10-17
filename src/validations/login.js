const Joi = require('@hapi/joi')

const loginSchema = {
    
        body: Joi.object({
            username : Joi.string().regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).message("wrong credential!!").required(),
            
            password: Joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/).message("wrong credential!!").required(),



        })
    
}

module.exports = loginSchema