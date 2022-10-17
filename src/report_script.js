const path = require('path')
require('dotenv').config({path: '../.env'})
const csvwriter = require('csv-writer').createObjectCsvWriter
const fs = require("fs")
const moment = require("moment")
const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true
}).then(() => console.log("MongoDB Is Connected !!!")).catch(err => console.log(err))


const notifyModel = require("./models/notifyModel")
const { Console } = require('console')


const database_report = async function(days){
    try {
        const filter = days
        const fetchReport = await notifyModel.find({createdAt:{$gte:(new Date(new Date() - filter * 60 * 60 * 24 * 1000))}})
        .select({fullName:1,phone:1,userID:1,articleName:1,articleID:1,createdAt:1,_id:0})
        if(!fetchReport.length>0){
            console.log("no data found for during this time period")
        }else{

        const csv = csvwriter({
            path:"report.csv",
            header:[
                {id:"fullName",title:"FullName"},
                {id:"phone", title:"phone"},
                {id:"userID", title:"userID"},
                {id:"articleName", title:"articleName"},
                {id:"articleID", title:"articleID"},
                {id:"createdAt", title:"createdAt"}
            ]
        })
        csv.writeRecords(fetchReport)
        .then(()=>console.log("the csv file saved !!"))
       
        }
    } catch (err) {
        console.log(err.message)
    }
}
database_report(1)