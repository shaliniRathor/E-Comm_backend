const express= require('express')
const router= express.Router()
const {getwebAllCategory,singleCategoryById}= require('../../controllers/web_controllers/category_controllers')

//all routes//
router.get('/get/web/category',getwebAllCategory)
router.get('/get/single/web/category/:id',singleCategoryById)

module.exports=router 