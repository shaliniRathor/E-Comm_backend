const category_schema= require('../../modals/category_schema')

//for all categeory//

const getwebAllCategory=async(req,res)=>{
    try {
        const find= await category_schema.find({})
        res.status(200).send({status:true, message:"all category",data:find})
    } catch (error) {
        res.status(500).send({message:"something went wrong !!"})
    }
}

module.exports={getwebAllCategory}