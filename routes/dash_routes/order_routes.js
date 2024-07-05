const express= require('express')
const { getAllOrder,createOrder,deleteOrder,updateOrder,searchOrder } = require('../../controllers/dash_controllers/order_controllers')
const router= express.Router()


//routes//

router.get('/get/all/order',getAllOrder)
router.get('/search/order/:search',searchOrder)
router.post('/create/new/order',createOrder)
router.delete('/delete/order/:id',deleteOrder)
router.patch('/update/order/:id',updateOrder)

module.exports= router