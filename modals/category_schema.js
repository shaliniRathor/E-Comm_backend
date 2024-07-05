const mongoose= require('mongoose')

const category_schema= new mongoose.Schema({
    category_name:String,
    image_url:String,
    image_name:String,
    path:String

},{timestamps:true})

module.exports= mongoose.model("categories",category_schema)