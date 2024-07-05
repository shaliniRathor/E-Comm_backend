const express= require('express')
const { getAlladmin,createadmin,deleteadmin,updateadmin, getAdminById, loginAdmin } = require('../../controllers/dash_controllers/admin_controllers')
const router= express.Router()

//routes//

router.get('/get/all/admin',getAlladmin)
router.get('/single/admin/:id',getAdminById)
router.post('/create/new/admin',createadmin)
router.post('/logIn/admin',loginAdmin)
router.patch('/update/admin/:id',updateadmin)
router.delete('/delete/admin/:id',deleteadmin)

module.exports= router