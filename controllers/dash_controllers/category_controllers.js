const category_schema = require('../../modals/category_schema');


//all category controllers//

const getAllCategory= async(req,res)=>{
let find;
const serchValue = req?.query?.searchData;
// all customer//
 if (!serchValue) {
      find= await category_schema.find({})
     
    } else {
        const searchRegex = new RegExp(serchValue, 'i')
         find = await category_schema.find({category_name:{$regex:searchRegex}})
        
    }
    
    console.log("all products=>",find);
    res.status(200).send({status:true,message:"all category",data:find})
}
  
                //search//

const searchCategory = async(req,res)=>{
    try {
        // if(find?.length <= 0){
        //     return res.status(404).send({status:false,message:"no result found!!"})
        // }
        res.status(200).send({status:true,message:"serach result",data:find})
        


        
    } catch (error) {
        res.status(500).send({message:"something went wrong !!"})
    }
}


const createCategory= async(req,res)=>{
    console.log("created ");
    console.log("body=>",req.body);
    const create= new category_schema({
     ...req.body  
    })
    const result= await create.save()
    res.status(200).send({status:true,message:"create succesfully",data:result})

}

const deleteCategory= async(req,res)=>{
    const id= req.params.id
    const deleted= await category_schema.findByIdAndDelete(id)
    console.log("delete successfully",deleted);
    res.status(200).send({status:true,message:"deleted sucessfully",})

}

const updateCategory= async(req,res)=>{
    console.log("updated successfully");
    const id= req.params.id
    console.log("body=>",req.body);
    const updated= await category_schema.findByIdAndUpdate(id,{$set:{...req.body}})
    console.log("updated=>",updated);
    res.status(200).send({status:true,message:"updated sucessfully"})
    
}

module.exports ={createCategory,deleteCategory,updateCategory,getAllCategory,searchCategory}