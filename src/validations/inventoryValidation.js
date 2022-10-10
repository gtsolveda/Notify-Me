const{body} = require("./inventory")
module.exports = {
    addInventoryValidation: async (req,res,next)=>{
        const value = await body.validate(req.body)
        if(value.error){
            console.log(value.error)
            res.status(400).json({status:"Rejected!!",message:value.error.details[0].message})
        } else {
            next()
        }
    }
}