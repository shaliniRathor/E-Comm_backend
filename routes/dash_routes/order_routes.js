const express= require('express')
const { getAllOrder,createOrder,deleteOrder,updateOrder,searchOrder, paymentOrder, paymentVerified,getSingleOrder } = require('../../controllers/dash_controllers/order_controllers')
const router= express.Router()


//routes//

router.get('/get/all/order',getAllOrder)
router.get('/get/single/order/:id',getSingleOrder)
router.get('/search/order/:search',searchOrder)
router.post('/create/new/order',createOrder)
router.post('/payment/order',paymentOrder)
router.post('/payment/verified',paymentVerified)
router.delete('/delete/order/:id',deleteOrder)
router.patch('/update/order/:id',updateOrder)

module.exports= router