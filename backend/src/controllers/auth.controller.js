const userModel=require("../models/user.model")
const foodPartnerModel=require("../models/foodpartner.model")
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

async function userRegister(req,res) {
    const {fullName,email,password}=req.body;
    const isuseralreadyexist=await userModel.findOne({email})
    if(isuseralreadyexist){
        return res.status(400).json({
            message:"User already exist"
        })
    }
    const hashPassword=await bcrypt.hash(password,10);
    const user=await userModel.create({
        fullName,
        email,
        password:hashPassword
    })
    const token=jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET)
    res.cookie('token',token)
    res.status(201).json({
        message:'User registerd Successfully',
        user:{
            _id:user.id,
            fullName:user.fullName,
            email:user.email
        }
    })
}

async function loginuser(req,res){
    const {email,password}=req.body
    const user=await userModel.findOne({
        email
    })
    if(!user){
        return res.status(400).json({
            message:"Invalid Email or Password"
        })
    }
    const isPasswordValid=await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid Email or Password"
        })
    }
    const token=jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET)
    res.cookie("token",token)
    res.status(201).json({
        message:"User Loggin Success"
    })
}

function logoutuser(req,res){
    res.clearCookie("token")
    res.status(200).json({
        message:"Logged Out"
    })
}

async function foodpartnerRegister(req,res){
    const {Name,email,password,phone,address,contactName}=req.body
    const isfoodpartneralreadyexist=await foodPartnerModel.findOne({
        email
    })
    if(isfoodpartneralreadyexist){
        return res.status(400).json({
            message:"User Already exists"
        })
    }
    const hashPassword=await bcrypt.hash(password,10);
    const foodpartner=await foodPartnerModel.create({
        Name,
        email,
        password:hashPassword,
        phone,
        address,
        contactName
    })
    const token=jwt.sign({
        id:foodpartner._id,
    },process.env.JWT_SECRET)
    res.cookie('token',token)
    res.status(201).json({
        message:'Foodpartner registerd Successfully',
        foodpartner:{
            _id:foodpartner.id,
            Name:foodpartner.Name,
            email:foodpartner.email
        }
    }) 
}

async function loginfoodpartner(req,res){
    const {email,password}=req.body
    const foodpartner=await foodPartnerModel.findOne({
        email
    })
    if(!foodpartner){
        return res.status(400).json({
            message:"Invalid Email or Password"
        })
    }
    const isPasswordValid=await bcrypt.compare(password,foodpartner.password)
    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid Email or Password"
        })
    }
    const token=jwt.sign({
        id:foodpartner._id,
    },process.env.JWT_SECRET)
    res.cookie("token",token)
    res.status(201).json({
        message:"FoodPartner Loggin Success"
    })
}

function logoutfoodpartner(req,res){
    res.clearCookie("token")
    res.status(200).json({
        message:"Logged Out"
    })
}

module.exports={userRegister,loginuser,logoutuser,foodpartnerRegister,loginfoodpartner,logoutfoodpartner}