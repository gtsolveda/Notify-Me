const express = require("express");
const router = express.Router();

const { notifyMeDetails, getUserByUserID, getUserByArticleID,getDataByDay } = require("../controllers/notifyController")
const {inventoryData} = require("../controllers/inventoryController")

// routes handler====================================//

router.post("/notifyMe", notifyMeDetails);
router.get("/users/:userID", getUserByUserID)
router.get("/user/:articleID", getUserByArticleID)
router.get("/userData", getDataByDay)
router.post("/invetory", inventoryData)

module.exports = router