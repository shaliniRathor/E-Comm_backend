const Razorpay = require('razorpay');
const crypto= require('crypto')
const order_schema = require('../../modals/orders_schema');

const orderid = require('order-id')('key');



//all Order controllers//

const getAllOrder= async(req,res)=>{
    let find;
    const searchValue= req?.query?.searchdata
    console.log("searchValue=>",searchValue);


    //get all customer//
    if (!searchValue) {
     find= await order_schema.find({}).sort({ createdAt: -1 })
        
    } else {
    const searchRegex= new RegExp(searchValue,'i')
     find= await order_schema.find({customer_details:{$regex:searchRegex}})
    
}
    res.status(200).send({status:true,message:"all order",data:find})

    console.log("all products=>",find);
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

const getSingleOrder=async(req,res)=>{
    const id=req?.params?.id
    console.log(id);
    const edit= await order_schema.findById(id)
    console.log("edit=>",edit);
    res.status(200).send({status:true,message:"single order found",data:edit})
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

//---------------payment gateway integration-------------//
const paymentOrder= async(req,res)=>{
    try {
        const instance= new Razorpay({
            key_id:process.env.KEY_ID,
            key_secret:process.env.KEY_SECRET
        });
        const option={
            amount:req.body.amount*100,
            currency:'INR',
        }
        // let response = await instance.orders.create(option)
        
        await instance.orders.create(option,(error,order)=>{
            if (error) {
                console.log(error);
              return  res.status(404).send({status:true,message:"something went wrong!!"})
            } 
            res.status(200).send({status:true,message:"Razorpay Order Crated Successfully",data:order})
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({message:'internal server error'})
    }
}

//-----------payment verified---------------//

const paymentVerified=async(req,res)=>{
    try {
        const{
         razorpay_order_id,
         razorpay_payment_id,
         razorpay_signature  }= req.body
     const sign= razorpay_order_id + '|' + razorpay_payment_id;
      const expectedSign= crypto
      .createHmac('sha256',process.env.KEY_SECRET)
      .update(sign.toString())
      .digest('hex')

         if (razorpay_signature===expectedSign) {
             return res.status(200).json({message:'payment verified successfully'})
         } else{
             return res.status(400).json({message:"invalid signature sent!!"})
         }

} catch (error) {
 console.log(error);
 res.status(500).json({message:'internal server error'})

}
}

module.exports ={createOrder,deleteOrder,updateOrder,getAllOrder,searchOrder,paymentOrder,paymentVerified,getSingleOrder}