const express= require('express')
const router= express.Router()
const {getwebAllproducts, getIdsingleWebProduct,deleteWebproducts}= require('../../controllers/web_controllers/product_controllers')
const { authCheckMiddleware } = require('../../middlewares/auth')

//---------all-----------------//

router.get('/all/web/products',getwebAllproducts)
router.get('/single/products/:id',getIdsingleWebProduct)
router.get('/delete/web/products/:id',deleteWebproducts)
// router.post('/create/web/products',createWebProducts)

module.exports= router