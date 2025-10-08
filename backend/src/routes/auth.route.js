const express=require('express')
const authcontroller=require('../controllers/auth.controller')
const router=express.Router()


router.post('/user/register',authcontroller.userRegister)
router.post('/user/login',authcontroller.loginuser)
router.get('/user/logout',authcontroller.logoutuser)



router.post('/food-partner/register',authcontroller.foodpartnerRegister)
router.post('/food-partner/login',authcontroller.loginfoodpartner)
router.get('/food-partner/logout',authcontroller.logoutfoodpartner)
module.exports=router