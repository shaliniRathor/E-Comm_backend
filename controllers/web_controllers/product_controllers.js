const products_schema= require('../../modals/products_schema.js')

// ------------------all products-----------//

const getwebAllproducts= async(req,res)=>{
    try {
        let find;
        const searchValue= req?.query?.searchdata
        console.log("searchValue=>",searchValue);


        if(!searchValue)
       find= await products_schema.find({})
    else{
        const searchRegex= new RegExp(searchValue,'i')
        find= await products_schema.find({product_name:{$regex:searchRegex}})
    }
        res.status(200).send({status:true,message:"all products",data:find})
        
        console.log('allproducts=>>>',find);
    } catch (error) {
        console.log("something went wrong", error);
    }
}

const getIdsingleWebProduct= async(req,res)=>{
    const id= req?.params?.id
    console.log("idddd=>",id);
    try {
        const edit= await products_schema.findById(id)
        res.status(200).send({status:true,message:"find products",data:edit})
    } catch (error) {
        console.log("something went wrong", error);
    }
}

const deleteWebproducts= async(req,res)=>{
    const id= req.params.id
    const deleted= await products_schema.findByIdAndDelete(id)
    console.log("delete successfully",deleted);
    res.status(200).send({status:true,message:"deleted sucessfully",})

}

// const createWebProducts=async(req,res)=>{
//     try {
//         const create= new products_schema({...req.body})
//         const result= await create.save() 
//         console.log(create);
//        res.status(200).send({status:true, message:"product Created Succeefullu",data:result})
//     } catch (error) {
//         console.log("something went wrong", error);
        
//     }
// }

module.exports={getwebAllproducts,getIdsingleWebProduct,deleteWebproducts}