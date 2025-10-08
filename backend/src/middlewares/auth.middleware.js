const foodPartnerModel=require('../models/foodpartner.model')
const usermodel=require('../models/user.model')
const jwt=require('jsonwebtoken')

async function authfoodpartnermiddleware(req,res,next){
        const token=req.cookies.token
        if(!token){
            return res.status(401).json({
                message:"Not Authorize"
            })
        }
        try{
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            const foodPartner=await foodPartnerModel.findById(decoded.id)
            req.foodPartner=foodPartner //making new property in req
            next()
        }catch(err){
            return res.status(401).json({
                message:"Invalid Food Partner"
            })
        }
}
async function authusermiddleware(req,res,next){
      const token=req.cookies.token
        if(!token){
            return res.status(401).json({
                message:"Not Authorize"
            })
        }
        try{
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            const user=await usermodel.findById(decoded.id)
            req.user=user //making new property in req
            next()
        }catch(err){
            return res.status(401).json({
                message:"Invalid User"
            })
        }
}

module.exports={authfoodpartnermiddleware,authusermiddleware}