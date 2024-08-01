const customers_schema=require('../../modals/customers_schema.js')

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
           res.status(200).send({status:true, message:"logIn successfully", data:findOne})

    } catch (error) {
        console.error("error>>>",error);
        res.status(500).send({status:false,message:"something Went Wrong"})
    }
}

module.exports={registerCustomer,login_customer}