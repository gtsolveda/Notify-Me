const moment = require("moment");
const notifyModel = require("../models/notifyModel")
const handler = require("../Error/config.json")

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

//============================post api for create userdetails for notify me ==========================//

const notifyMeDetails = async function (req, res) {
    try {
        const data = req.body
        const { fullName, email, phone, articleName, articleID, userID } = data
        if (!(isValid(fullName)) || !(isValid(phone)) || !(isValid(articleName)) || !(isValid(articleID)) || !(isValid(userID))) {
            return res.status(400).send({ msg: handler.err1 })
        }
        if (!(/^[A-Za-z ]+$/.test(fullName)) || !(/^\d{10}$/).test(phone) || !(/^\d{6}$/).test(userID)) {
            return res.status(400).send({ msg:handler.err2 })
        }
        const duplicate = await notifyModel.find({ $and: [{ articleID: articleID }, { userID: userID }] })
        if (duplicate.length > 0) {
            return res.status(400).send({ msg: handler.err3 })
        } else {

            const savedData = await notifyModel.create(data)
            return res.status(201).send({ message:handler.status, data: savedData })
        }
    } catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }
}

//=================================get Api find list by userID ============================================================//

const getUserByUserID = async function (req, res) {
    try {
        const userID = req.params.userID;
        const getDetails = await notifyModel.find({ userID: userID }).select({ articleName: 1, articleID: 1 })
        //If no users found in notifymeModel
        if (getDetails.length === 0) {
            return res.status(404).send({ msg:handler.err5 });
        }
        return res.status(200).send({ data: getDetails });

    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
}

//=================================get api find list by ArticleID ==============================================//

const getUserByArticleID = async function (req, res) {
    try {
        const articleID = req.params.articleID;
        const userDetails = await notifyModel.find({ articleID: articleID }).select({ fullName: 1, phone: 1, userID: 1, email: 1 })
        //If no users found in notifymeModel
        if (userDetails.length === 0) {
            return res.status(404).send({ msg:handler.err4 });
        }
        return res.status(200).send({ data: userDetails });

    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
}


//===================================get Api to fetch data last n days============================//


const getDataByDay = async function (req, res) {
    try {
        const filter = req.query.createdAt
        const data = await notifyModel.find({ createdAt: { $gte: (new Date(new Date() - filter * 60 * 60 * 24 * 1000))}})
        return res.status(200).send({ data: data });

    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
}


module.exports = { notifyMeDetails, getUserByUserID, getUserByArticleID, getDataByDay };