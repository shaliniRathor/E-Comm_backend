const admin_schema=require('../../modals/admin_schema.js');

//all admin controllers//

const getAlladmin = async (req, res) => {
  let find;
  const searchVale= req.query.searchData
  console.log("searchVale==>>",searchVale);
  
  if (!searchVale) {
     find = await admin_schema.find({});
    
   } else {
    const searchRegex= new RegExp(searchVale,'i')
    find = await admin_schema.find({name:{$regex:searchRegex}}) 
   }

   res.status(200).send({ status: true, message: "all admin", data: find });
   console.log("all admin=>", find);
};

const createadmin = async (req, res) => {
  console.log("created ");
  console.log("body=>", req.body);
  const create = new admin_schema({
    ...req.body,
  });
  const result = await create.save();
  res
    .status(200)
    .send({ status: true, message: "create succesfully", data: create });
};

const loginAdmin = async(req,res)=>{
try {
  console.log("body",req.body);
  let findOne=await  admin_schema.findOne({email:req.body.email,password:req.body.password})
  if (findOne) {
    res.status(200).send({status:true, message:"logIn successfully", data:findOne})
  
  } else {
    res.status(202).send({status:false, message:"Invalid E-mail or Phone Number"})
  }
} catch (error) {
  console.log(error);
  res.status(500).send({message:"something went wrong"})
}
}



const getAdminById=async(req,res)=>{
    const id=req?.params?.id
    console.log(id);
    const edit= await admin_schema.findById(id)
    console.log("edit=>",edit);
    res.status(200).send({status:true,message:"admin found",data:edit})
}

const deleteadmin = async (req, res) => {
  const id = req.params.id;
  const deleted = await admin_schema.findByIdAndDelete(id);
  console.log("delete successfully", deleted);
  res.status(200).send({ status: true, message: "deleted sucessfully" });
};

const updateadmin = async (req, res) => {
  
  console.log("updated successfully");
  const id = req?.params?.id;
  const updated = await admin_schema.findByIdAndUpdate(id, {
    $set: { ...req.body },
  });
  console.log("updated=>", updated);
  res.status(200).send({ status: true, message: "updated sucessfully" });
};

module.exports = { createadmin, deleteadmin, updateadmin, getAlladmin, getAdminById,loginAdmin };
