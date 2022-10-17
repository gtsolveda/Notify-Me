const loginModel = require("../models/loginCredential")
const Errors = require("./error.json");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//===================================SignUp==========================================//

const signUp = async function(req,res){
    try {
        const data = req.body;
        const{username,password} = data
        const sameDoc = await loginModel.find({username:username})
        if(sameDoc.length>0){
            return res.status(400).send({status:'Rejected',msg:Errors.DATA_ALREADY_EXIST})
        }
        const encryptPassword = await bcrypt.hash(password,12)
        const loginData = {username,password:encryptPassword}
        const saved_Data = await loginModel.create(loginData)
        return res.status(201).send({ data:saved_Data })

 
    } catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message})
        
    }
}

//============================================Signin===============================================//

const signIn = async function(req,res){
    try {
        const data = req.body
        const{username,password} = data
        const loginDetails = await loginModel.findOne({username:username})
        if(!loginDetails){
            return res.status(401).send({status:"Rejected", msg:"Wrong credentials!!"})
        }
        const match = await bcrypt.compare(password,loginDetails.password)
        if(!match){
            return res.status(400).send({status:"Rejected", msg:"Please provide valid password!!"})
        }
        const loginID = loginDetails._id
        const token = jwt.sign({loginID:loginID},
            "solveda@2022",
            {expiresIn:"30min"}
            );
            res.status(200).send({
                msg: "user login successfully",
                data:{token}
            });



        
    } catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message})
        
    }
}


module.exports={signUp,signIn}

