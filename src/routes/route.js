const express = require("express");
const router = express.Router();

const { notifyMeDetails, getUserByUserID, getUserByArticleID,getDataByDay } = require("../controllers/notifyController")


// routes handler====================================//

router.post("/notifyMe", notifyMeDetails);
router.get("/users/:userID", getUserByUserID)
router.get("/user/:articleID", getUserByArticleID)
router.get("/userData", getDataByDay)

module.exports = router