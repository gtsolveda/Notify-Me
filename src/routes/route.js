const express = require("express");
const router = express.Router();

const { notifyMeDetails, getUserByUserID, getUserByArticleID} = require("../controllers/notifyController")
const {inventoryData} = require("../controllers/inventoryController")
const{signUp,signIn} = require("../controllers/loginController")
const{addNotifyValidation} = require("../validations/notifyValidation");
const { addInventoryValidation } = require("../validations/inventoryValidation");
const{addLoginValidation} = require("../validations/loginValidation")

// routes handler====================================//

router.post("/notifyMe",addNotifyValidation,notifyMeDetails)
router.get("/users/:userID", getUserByUserID)
router.get("/user/:articleID", getUserByArticleID)
router.post("/invetory",addInventoryValidation, inventoryData)
router.post("/signUp",addLoginValidation,signUp)
router.post("/signIn",addLoginValidation,signIn)

module.exports = router