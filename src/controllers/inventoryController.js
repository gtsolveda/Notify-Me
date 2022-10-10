const schedule = require("node-schedule")
const notifyModel = require("../models/notifyModel")
const inventoryModel = require("../models/inventoryModel")
//const handler = require("../config/config.json")
//const Errors = require("./error.json");



//===========================inventory post Api========================================/////////

const inventoryData = async function (req, res) {
    try {
        const data = req.body
        const {articleName, articleID, availableQty} = data
        const duplicate = await inventoryModel.find({$and:[{ articleID: articleID },{articleName:articleName}]})
        if (duplicate.length > 0) {
            const details = await inventoryModel.findOneAndUpdate({articleID:articleID},{$inc:{availableQty:+availableQty}},{new:true})
           return res.status(200).send({data:details})
        } else {

            const savedData = await inventoryModel.create(data)
            return res.status(201).send({data:savedData })
        }
    } catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }
}


//========================Node-schedule========================================================//


   var dbDoc = []
   const x= async function data(){
    const result =  await inventoryModel.find({availableQty:{$gt:0}})
       result.map((d,y)=> {
          dbDoc.push(d.articleID)
        })
    
     await notifyModel.find({articleID:{$in:dbDoc}}).select({fullName:1, phon:1, email:1,userID:1,articleID:1, _id:0})
        .then(data => {
           console.log(data)
        })
        .catch(error => {
            console.log(error)
       })
   }

  // schedule.scheduleJob('*/10 * * * * *',  function(){
    // console.log(x())
   // })



module.exports={inventoryData}


