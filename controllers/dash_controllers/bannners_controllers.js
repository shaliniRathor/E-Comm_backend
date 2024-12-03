const banners_schema= require('../../modals/banners_schema')

//all bannners controlllers//

const getAllBanners= async(req,res)=>{
    const find= await banners_schema.find({})
    console.log("all banners=>",find);
    res.status(200).send({status:true,message:"all banners",data:find})
}

const createBanners= async(req,res)=>{
    console.log("created");
    const create=  new banners_schema({
        ...req.body
    })
    const result= await create.save()
    res.status(200).send({status:true,message:"created successfully",data:result})
}



const deleteBannners= async(req,res)=>{
   const id= req.params.id
   console.log(id); 
   const deleted= await banners_schema.findByIdAndDelete(id)
   console.log("deleted successfully",deleted);
   res.status(200).send({status:true,message:"deleted successfully"})
}

const updateBanners= async(req,res)=>{
   try {
    const id= req.params.id
    console.log(id, req?.body);
    const updated= await banners_schema.findByIdAndUpdate(id,{$set:{...req.body}})
    console.log("updated",updated);
    res.status(200).send({message:"updated successfully"})
    
   } catch (error) {
    console.log(error);
    res.status(500).send({message:"server error"})
    
   }
}

module.exports={getAllBanners,createBanners,deleteBannners,updateBanners,getAllBanners}