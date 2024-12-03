const customers_schema=require('../modals/customers_schema')
const jwt = require("jsonwebtoken")

const authCheckMiddleware = async(req,res,next)=>{
    const cookie= req.cookies["session_id"]
    console.log("COOKIE==",cookie);
    
    if (!cookie) {
        return res.send({status:false,message:"unauthenticated"})
    }
    const verifyJwt= await jwt.verify(cookie,"12345")
    console.log("verify==>>",verifyJwt);
    
    if (!verifyJwt) {
        return res.send({status:false,message:"unauthenticated"})
    }

    const finduser= await customers_schema.findById(verifyJwt._id)
    console.log("FINDUSER==>",finduser);
    
    if (!finduser) {
        return res.send({status:false,message:"unauthenticated"})
    }
    next()
}

module.exports = {authCheckMiddleware};