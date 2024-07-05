const express= require('express')
const router= express.Router()
const {getwebAllproducts, getIdsingleWebProduct}= require('../../controllers/web_controllers/product_controllers')

//---------all-----------------//

router.get('/all/web/products',getwebAllproducts)
router.get('/single/products/:id',getIdsingleWebProduct)

module.exports= router