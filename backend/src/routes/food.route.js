const express=require('express')
const foodController=require('../controllers/food.controller')
const authMiddleware=require('../middlewares/auth.middleware')
const router=express.Router()
const multer=require('multer')

const upload=multer({
    storage:multer.memoryStorage()
})


router.post('/',authMiddleware.authfoodpartnermiddleware,upload.single('video'),foodController.createfood)
router.get('/',authMiddleware.authusermiddleware,
    foodController.getfooditem
)
router.post("/like",authMiddleware.authusermiddleware,foodController.likefood)
router.post('/save',authMiddleware.authusermiddleware,foodController.savefood)

router.get('/save',
    authMiddleware.authusermiddleware,
    foodController.getSaveFood
)

module.exports=router