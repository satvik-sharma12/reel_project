const express = require('express');
const foodController = require('../controllers/food-partner.controller');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
router.get("/:id",
    authMiddleware.authfoodpartnermiddleware,
    foodController.getFoodPartnerById
)


module.exports = router;