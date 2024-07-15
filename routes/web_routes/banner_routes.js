const express= require('express')
const router= express.Router()
const{getAllWebBanners}= require('../../controllers/web_controllers/Banner_controllers')
 
//----all routes----//

router.get('/get/web/banners',getAllWebBanners)
// router.get('/')

module.exports=router