const schedule = require("node-schedule")
const notifyModel = require("../models/notifyModel")
const inventoryModel = require("../models/inventoryModel")
const handler = require("../Error/config.json")

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

//===========================inventory post Api========================================/////////

const inventoryData = async function (req, res) {
    try {
        const data = req.body
        const {articleName, articleID, availableQty} = data
        if (!(isValid(articleName)) || !(isValid(articleID)) || !(isValid(availableQty))) {
            return res.status(400).send({ msg: handler.err1 })
        }
        const duplicate = await inventoryModel.find({$and:[{ articleID: articleID },{articleName:articleName}]})
        if (duplicate.length > 0) {
            const details = await inventoryModel.findOneAndUpdate({articleID:articleID},{$inc:{availableQty:+availableQty}},{new:true})
           return res.status(200).send({ msg: handler.status1, data:details })
        } else {

            const savedData = await inventoryModel.create(data)
            return res.status(201).send({ message:handler.status2, data:savedData })
        }
    } catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }
}


//========================Node-schedule========================================================//
var dbDoc = []
const x= async function data(){
    const result =  await inventoryModel.find({availableQty:{$gt:1}})
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

schedule.scheduleJob('*/10 * * * * *', async function(){
     console.log(x())
})



module.exports={inventoryData}


