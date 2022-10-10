
const notifyModel = require("../models/notifyModel")
//const handler = require("../config/config.json")
const Errors = require("./error.json");
const redis = require("redis");
const { json } = require("express");

const client = redis.createClient()
 client.connect()

//const redisUrl = 'redis://127.0.0.1:6379'
//const client = redis.createClient(redisUrl)
client.on("error",(error)=>{
    console.error("Error encounterd",error)
})
client.on("connect", async ()=>{
    console.log("Redis connection established")
})

   




const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

//============================post api for create userdetails for notify me ==========================//

const notifyMeDetails = async function (req, res) {
    try {
        const data = req.body
        const { fullName, phone, articleName, articleID, userID } = data
        
         const sameDoc = await notifyModel.find({ $and: [{ userID:userID },{ fullName:fullName},{phone:phone},{articleName:articleName},{articleID:articleID}]})
         if (sameDoc.length>0){
            return res.status(400).send(Errors.DATA_ALREADY_EXIST)
         }  
         const saved_Data = await notifyModel.create(data)
         return res.status(201).send({ data: saved_Data })
    } catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message})
    }
}

//=================================get Api find list by userID ============================================================//

const getUserByUserID = async function (req, res) {
    try {
        const filter = req.query.number_Of_Days
        const userID = req.params.userID;
        const value = await client.get(userID)
         if(value){

                return res.status(200).send({
                    success:true,
                    msg:"from cache",
                    data:JSON.parse(value),
                   
                })
            } else{
                const x = await notifyModel. find({userID:userID,createdAt:{$gte:(new Date(new Date() - filter * 60 * 60 * 24 * 1000))}}).select({ fullName: 1, phone: 1, userID: 1, email: 1 })
              await client.SETEX(userID,1440,JSON.stringify(x))
                return res.status(200).send({
                    success:true,
                    msg:"from server",
                    data:x
                   
                })
            }     
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
}

            



//=================================get api find list by ArticleID ==============================================//

const getUserByArticleID = async function (req, res) {
   
    try {
        const filter = req.query.number_Of_Days
        const articleID = req.params.articleID;
        const value = await client.get(articleID)
         if(value){

                return res.status(200).send({
                    success:true,
                    data:JSON.parse(value),
                    msg:"from cache",
                })
            } else{
                const x = await notifyModel. find({articleID: articleID,createdAt:{$gte:(new Date(new Date() - filter * 60 * 60 * 24 * 1000))}}).select({ fullName: 1, phone: 1, userID: 1, email: 1 })
              await client.SETEX(articleID,1440,JSON.stringify(x))
                return res.status(200).send({
                    success:true,
                    data:x,
                    msg:"from server"
                })
            }     
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
}



module.exports = { notifyMeDetails, getUserByUserID, getUserByArticleID};