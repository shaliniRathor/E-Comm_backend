const express= require('express')
const { getAllcustomers,createcustomers,updatecustomers,deletecustomers, searchCustomers, getcustomerbyId, } = require('../../controllers/dash_controllers/customers_controllers')
const router= express.Router()


//routes//

router.get('/get/all/customers',getAllcustomers)
router.get('/get/single/customer/:id',getcustomerbyId)
router.get('/search/customers/:search',searchCustomers)
router.post('/create/new/customers',createcustomers)
router.delete('/delete/customers/:id',deletecustomers)
router.patch('/update/customers/:id',updatecustomers)

module.exports= router