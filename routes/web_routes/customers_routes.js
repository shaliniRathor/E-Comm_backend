const express= require('express')
const router= express.Router()

const{registerCustomer,login_customer}= require('../../controllers/web_controllers/customer_controllers')

//routes//
router.post('/register',registerCustomer)
router.post('/logIn',login_customer)

module.exports=router