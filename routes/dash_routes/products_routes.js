const express= require('express')
const { getAllproducts,createproducts,deleteproducts,updateproducts, searchProducts,getProductbyId } = require('../../controllers/dash_controllers/products_controllers')
const router= express.Router()


//routes//

router.get('/get/all/products',getAllproducts)
router.get('/get/single/product/:id',getProductbyId)
router.get('/get/all/products/:searchdata',searchProducts)
router.post('/create/new/products',createproducts)
router.delete('/delete/products/:id',deleteproducts)
router.patch('/update/products/:id',updateproducts)

module.exports= router