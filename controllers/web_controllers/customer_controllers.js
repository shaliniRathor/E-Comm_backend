const customers_schema=require('../../modals/customers_schema.js')
const jwt = require("jsonwebtoken")

//login customers//

const registerCustomer= async(req,res)=>{
    console.log("body=>>",req.body);
    try {
        const create= new customers_schema({...req.body})
        const result= await create.save()
        res.status(200).send({status:true, message:"Acoount created ", result})
    } catch (error) {
        console.log("error=>",error);
        res.status(400).send("something went wrong !!")     
    }
}

const login_customer= async(req,res)=>{
    console.log("bodyyyy========>>>",req.body);
    try {
        let findOne= await customers_schema.findOne({email:req.body.email,password:req.body.password})
        console.log("findOne=>",findOne);
        if(!findOne){
            return res.status(202).send({status:false, message:"user not found !"})
           
        }
        // let comparePassword = bcrypt.compare(req.body.password,findOne.password)
  
        // if(!comparePassword){
        //   res.status(404).send({status:false, message:"password not match !"})
        //   return 
        // }
  
        // if (comparePassword) {
            
        //   res.status(200).send({status:true, message:"logIn successfully", data:findOne})
        // } else {
        //   res.status(202).send({status:false, message:"Invalid E-mail or Phone Number"})
        // }


        console.log("FIND ONE===",findOne);
        
        const token = await jwt.sign({_id:findOne?._id},"12345",{expiresIn:"9d"})

        // const tokenVerify= await jwt.verify()

        // let expiryDate=
        res.cookie("session_id",token,
        {
            httpOnly:true,
            maxAge: 24* 60* 60* 1000,
            sameSite: "none", secure:true
            
        })

           res.status(200).send({status:true, message:"logIn successfully", data:token})

    } catch (error) {
        console.error("error>>>",error);
        res.status(500).send({status:false,message:"something Went Wrong"})
    }
}

//get user by id(who's logged in)
const getUserById=async(req,res,next)=>{
try {
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
    res.status(200).send({status:true, message:"authenticated", data:finduser})

} catch (error) {
    console.error("error>>>",error);
    res.status(500).send({status:false,message:"something Went Wrong"})
}
}

const logOutUser=async(req,res)=>{
    res.cookie("session_id","",{maxAge:0,httpOnly:true,sameSite:'none',secure:true})
    res.status(200).send("LogOut successfully")
}

const discount=async(req,res)=>{
    const createDiscount= req.body
    console.log("body",req.body)
    const createNewDiscount= customers_schema.new({...createDiscount})
    const result= createDiscount.createNewDiscount.save()
    res.status(200).send({status:true, message:"add discount successfully", data:result})
}

module.exports={registerCustomer,login_customer,getUserById,logOutUser,discount}