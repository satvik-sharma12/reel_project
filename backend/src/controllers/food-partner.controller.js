const foodPartnerModel=require('../models/foodpartner.model')
const foodModel=require('../models/food.model')    


async function getFoodPartnerById(req,res){
    const foodPartnerId=req.params.id;
    const foodPartner=await foodPartnerModel.findById(foodPartnerId)
    const foodsitembyfoodparter=await foodModel.find({foodPartner:foodPartnerId})
    if(!foodPartner){
        return res.status(404).json({
            message:"Food Partner not found"
        })
    }
    res.status(200).json({
        message:"Food Partner fetched successfully",
        foodPartner:{
            ...foodPartner.toObject(),
            fooditem:foodsitembyfoodparter
        }
    })
}
    module.exports={getFoodPartnerById}