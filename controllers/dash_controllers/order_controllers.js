const Razorpay = require('razorpay');
const crypto= require('crypto')
const order_schema = require('../../modals/orders_schema');

const orderid = require('order-id')('key');



//all Order controllers//

// const getAllOrder= async(req,res)=>{
//     try {
        
//         let find;
//         const searchValue= req?.query?.searchdata
//         const fiterstatus= req?.query?.statusFilter
//         console.log("searchValue=>",searchValue);
//         console.log("status=>",fiterstatus);

       
// if (!searchValue) {
//      find= await order_schema.find({}).sort({ createdAt: -1 })
        
//     }  
//      else {
//     const searchRegex= new RegExp(searchValue,'i')
//      find= await order_schema.find({customer_details:{$regex:searchRegex}} 
//    ) }
        
//     if (fiterstatus != "all") {
//         find= await order_schema.find({remark:fiterstatus }) 
//         console.log("find Status====>>",find?.length);
//         return  res.status(200).send({status:true,message:"order patient", data:find, countemergency})   
//        } 
//      else {
//             find= await patient_schema.find({})            
//         }
//         res.status(200).send({status:true,message:"all order", data:find})  

//     } catch (error) {
//         res.status(400).send("something went wrong !!")
//     }
//     //get all customer//
//     // if (!searchValue) {
//     //  find= await order_schema.find({}).sort({ createdAt: -1 })
        
//     // }  
//     //  else {
//     // const searchRegex= new RegExp(searchValue,'i')
//     //  find= await order_schema.find({customer_details:{$regex:searchRegex}}

//     //  if (fiterstatus != "all") {
//     //     find=  order_schema.find({remark:fiterstatus }) 
//     //     console.log("find Status====>>",find?.length);
//     //     return  res.status(200).send({status:true,message:"Status order", data:find,})   
//     //    } 
       
//     // else{
//     //     find=  order_schema.find({})   
//     // }   
//     // res.status(200).send({status:true,message:"all order",data:find})
    
//     //     console.log("all products=>",find);



// }

const getAllOrder= async(req,res)=>{
    try {
        let find;
        const searchValue= req?.query?.searchdata
        const fiterstatus= req?.query?.statusFilter
        const page= req?.query?.page ? parseInt(req?.query?.page) : 1
        const limit=  req?.query?.limit ? parseInt(req?.query?.limit) : 7
        const startIndex= (page - 1) * limit


        console.log("search====>",searchValue);

        if (searchValue) {
            const searchRegex= new RegExp( searchValue,'i')
            find= await order_schema.find({name:{$regex:searchRegex}} ).sort({createdAt:-1}).limit(limit).skip(startIndex)
        } 
        else if (fiterstatus != "all") {
             find= await order_schema.find({order_status:fiterstatus }).sort({createdAt:-1}).limit(limit).skip(startIndex)
             console.log("find Status====>>",find?.length);
            //  return  res.status(200).send({status:true,message:"Status Order", data:find})   
            } 
     
        else {
            find= await order_schema.find({})  
            
        }

        const getorderCount = await order_schema.find({}).countDocuments()
        const getlimitCount= getorderCount/limit
        console.log("order count",getlimitCount);
        
        
        // console.log("find",find);
        
        res.status(200).send({status:true,message:"all order", data:find })  
       
        console.log("find===>",find);
    } catch (error) {
        res.status(400).send("something went wrong !!")
    }
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