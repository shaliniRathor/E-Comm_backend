const mongoose= require('mongoose')

const banner_schema= new mongoose.Schema({

    image_url:String,
    image_name:String,
    path:String


},{timestamps:true})

module.exports= mongoose.model("banners",banner_schema)