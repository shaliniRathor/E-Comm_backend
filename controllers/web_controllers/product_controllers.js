const products_schema= require('../../modals/products_schema.js')

// ------------------all products-----------//

const getwebAllproducts= async(req,res)=>{
    try {
        const find= await products_schema.find({})
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

module.exports={getwebAllproducts,getIdsingleWebProduct}