const Joi = require('@hapi/joi')

const inventorySchema = {
    
        body: Joi.object({
            articleName : Joi.string().required(),
            articleID: Joi.string().required(),
            availableQty: Joi.number().required()


        })
    
}

module.exports = inventorySchema