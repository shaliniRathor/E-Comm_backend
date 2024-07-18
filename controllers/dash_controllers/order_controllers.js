const order_schema = require('../../modals/orders_schema');

const orderid = require('order-id')('key');



//all Order controllers//

const getAllOrder= async(req,res)=>{
    const find= await order_schema.find({})
    console.log("all products=>",find);
    res.status(200).send({status:true,message:"all Order",data:find})
}

            //search//
 
const searchOrder= async(req,res)=>{
    const searchValue= req?.value?.search
    const searchRegex= new RegExp(searchValue,'i')  // i for case insentive//
    try {
        const find= await order_schema.find({order_id:{$regex:searchRegex}})
        res.status(200).send({status:true,message:"search result",data:find})
        
    } catch (error) {
    res.status(404).send({status:true,message:"something wennt wrong!!",data:find})
        
    }
}            
 
const createOrder= async(req,res)=>{
    console.log("created ");
    console.log("bodyyy=>",req.body);
    const order_id = orderid.generate();
    const create= new order_schema({
     ...req.body,
     order_id:order_id
    })
    const result= await create.save()
    res.status(200).send({status:true,message:"create succesfully",data:result})

}

const deleteOrder= async(req,res)=>{
    const id= req.params.id
    const deleted= await order_schema.findByIdAndDelete(id)
    console.log("delete successfully",deleted);
    res.status(200).send({status:true,message:"deleted sucessfully",})

}

const updateOrder= async(req,res)=>{
    console.log("updated successfully");
    const id= req.params.id                               
    const updated= await order_schema.findByIdAndUpdate(id,{$set:{...req.body}})
    console.log("updated=>",updated);
    res.status(200).send({status:true,message:"updated sucessfully"})
    
}

module.exports ={createOrder,deleteOrder,updateOrder,getAllOrder,searchOrder}