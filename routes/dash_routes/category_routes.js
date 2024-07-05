const express= require('express')
const { getAllCategory,createCategory,deleteCategory,updateCategory, searchCategory } = require('../../controllers/dash_controllers/category_controllers')
const router= express.Router()

//routes//

router.get('/get/all/category',getAllCategory)
router.get('/search/in/category/:search',searchCategory)
router.post('/create/new/category',createCategory)
router.patch('/update/category/:id',updateCategory)
router.delete('/delete/category/:id',deleteCategory)

module.exports= router