const products_schema = require('../../modals/products_schema');


//all products controllers//

const getAllproducts= async(req,res)=>{
  
   try {
    let find;
    const searchValue= req?.query?.searchdata
    const fiterstatus= req?.query?.statusFilter
    console.log("searchValue=>",searchValue);
    console.log("stattusFilter=>",fiterstatus);


    //get all products//
    if (searchValue) {
        const searchRegex= new RegExp( searchValue,'i')
        find= await products_schema.find({name:{$regex:searchRegex}} )
    } 
    else if (fiterstatus != "all") {
         find= await products_schema.find({category:fiterstatus }) 
         console.log("find Status====>>",find?.length);   
        }   
    else {
        find= await products_schema.find({})  
        
    }
    
    res.status(200).send({status:true,message:"all products",data:find})

    console.log("all products=>",find);
   } catch (error) {
     res.status(400).send("something went wrong !!")
   }
}


const getProductbyId=async(req,res)=>{
    const id=req?.params?.id
    console.log(id);
    const edit= await products_schema.findById(id)
    console.log("edit=>",edit);
    res.status(200).send({status:true,message:"costumer found",data:edit})
}

                //search//

const searchProducts= async(req,res)=>{
    const searchValue= req?.params?.search
    const searchRegex= new RegExp(searchValue,'i')
    try {
        const find= await products_schema.find({product_name:{$regex:searchRegex}})
    res.status(200).send({status:true,message:"search result=>",data:find})
        
    } catch (error) {
    res.status(404).send({message:"something went wrong!!",})
        
    }
}                
 
const createproducts= async(req,res)=>{
    console.log("created ");
    const create= new products_schema({...req.body})
    const result= await create.save()
    res.status(200).send({status:true,message:"create succesfully",data:result})

}

const deleteproducts= async(req,res)=>{
    const id= req.params.id
    const deleted= await products_schema.findByIdAndDelete(id)
    console.log("delete successfully",deleted);
    res.status(200).send({status:true,message:"deleted sucessfully",})

}

const updateproducts= async(req,res)=>{
    console.log("updated successfully");
    const id= req.params.id

    console.log("update body", req.body);
    

    const updated= await products_schema.findByIdAndUpdate(id,{$set:{...req.body}})
    console.log("updated=>",updated);
    res.status(200).send({status:true,message:"updated sucessfully"})
    
}

module.exports ={createproducts,deleteproducts,updateproducts,getAllproducts,searchProducts,getProductbyId}