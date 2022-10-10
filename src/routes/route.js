const express = require("express");
const router = express.Router();

const { notifyMeDetails, getUserByUserID, getUserByArticleID} = require("../controllers/notifyController")
const {inventoryData} = require("../controllers/inventoryController")
const{addNotifyValidation} = require("../validations/notifyValidation");
const { addInventoryValidation } = require("../validations/inventoryValidation");

// routes handler====================================//

router.post("/notifyMe",addNotifyValidation,notifyMeDetails)
router.get("/users/:userID", getUserByUserID)
router.get("/user/:articleID", getUserByArticleID)
router.post("/invetory",addInventoryValidation, inventoryData)

module.exports = router