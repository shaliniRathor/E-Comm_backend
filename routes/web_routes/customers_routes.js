const express= require('express')
const router= express.Router()

const{registerCustomer,login_customer,getUserById,logOutUser}= require('../../controllers/web_controllers/customer_controllers')

//routes//
router.post('/register',registerCustomer)
router.post('/logIn',login_customer)
router.get('/get/authenticated/user',getUserById)
router.delete('/delete/authenticated/user',logOutUser)


module.exports=router