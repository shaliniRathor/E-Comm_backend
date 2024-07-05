const express= require('express')
const { getAllBanners,createBanners,deleteBannners,updateBanners, } = require('../../controllers/dash_controllers/bannners_controllers')
const router= express.Router()


//routes//

router.get('/get/all/banners',getAllBanners)
// router.get('/get/single/banners/:id',)
router.post('/create/new/banners',createBanners)
router.delete('/delete/banners/:id',deleteBannners) 
router.patch('/update/banners/:id',updateBanners)

module.exports= router