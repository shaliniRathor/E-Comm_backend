const express= require('express')
const router= express.Router()
const {getwebAllCategory}= require('../../controllers/web_controllers/category_controllers')

//all routes//
router.get('/get/web/category',getwebAllCategory)

module.exports=router