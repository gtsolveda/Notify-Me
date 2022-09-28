const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({

    articleName: {
        type: String,
    },

    articleID: {
        type: String,
        required:true
    },

    availableQty: {
        type: Number,
        required: true
    }
},{timestamps:true}
)




module.exports = mongoose.model('inventory', inventorySchema)