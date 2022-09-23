const mongoose = require("mongoose");
const moment = require('moment')

const notifySchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String
    },

    phone: {
        type: String,
        required: true,
        unique: true
    },
    
    articleName:{
        type: String,
        required: true,
        trim: true
    },

    articleID: {
        type: String,
        required: true
    },

    userID: {
        type: String,
        required: true
    }},{timestamps:true}
   

)




module.exports = mongoose.model('notifyme', notifySchema)