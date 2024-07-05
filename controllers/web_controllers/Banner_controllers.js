const banner_schema= require('../../modals/banners_schema')

//all banners//

const getAllWebBanners=async(req,res)=>{
   try {
    const find= await banner_schema.find({})
        res.status(200).send({status:true, message:"all category",data:find})

    
   } catch (error) {
    res.status(500).send({message:"something went wrong !!"})
    
   }
}

module.exports={getAllWebBanners}