const express = require("express")
const bodyParser = require("body-parser")
const route = require("./routes/route")
const mongoose = require("mongoose")
const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://gtgaurav:Wp2gKNWXbHDifb5n@cluster0.9p9yl.mongodb.net/notifyMeDatabase", {
    useNewUrlParser: true
}).then(() => console.log("MongoDB Is Connected !!!")).catch(err => console.log(err))


app.use('/', route);

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});