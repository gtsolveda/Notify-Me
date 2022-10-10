const path = require('path')
require('dotenv').config({path: '../.env'})
const express = require("express")
const bodyParser = require("body-parser")
const route = require("./routes/route")
const mongoose = require("mongoose")
const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true
}).then(() => console.log("MongoDB Is Connected !!!")).catch(err => console.log(err))


app.use('/', route);

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});