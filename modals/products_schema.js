const mongoose= require('mongoose')

const products_schema= new mongoose.Schema({

    product_name:String,
    price:Number,
    category:String,
    quantity:String,
    description:String,
    image:[{
        image_url:String,
        image_name:String,
        path:String
    }]

    

},{timestamps:true})

module.exports= mongoose.model("products",products_schema)