const foodModel=require("../models/food.model")
const storageservice=require("../services/storage.service")
const likeModel=require("../models/likes.model")
const saveModel=require("../models/save.model")
const {v4:uuid}=require("uuid")
async function createfood(req,res){
   
    const fileuploadresult=await storageservice.fileUpload(req.file.buffer,uuid())
    const fooditem=await foodModel.create({
        name:req.body.name,
        video:fileuploadresult.url,
        description:req.body.description,
        foodPartner:req.foodPartner._id
    })


  res.status(201).json({
    message:"Food Created Successfull",
    food:fooditem
  })
}
async function getfooditem(req,res){
    const fooditem=await foodModel.find({})
    res.status(201).json({
        message:"Fooditem fetched succesfully",
        fooditem
    })
}

async function likefood(req,res){
  const {foodId}=req.body;
  const user=req.user;
  const isAlreadyLiked=await likeModel.findOne({food:foodId,user:user._id})
  if(isAlreadyLiked){
    await likeModel.deleteOne({user:user._id,food:foodId})

    await foodModel.findByIdAndUpdate(foodId,{
      $inc:{likeCount:-1} 
    })

    return res.status(200).json({
      message:"Food Unliked"
    })
  }
  const like=await likeModel.create({
    user:user._id,
    food:foodId
  })
  await foodModel.findByIdAndUpdate(foodId,{
    $inc:{likeCount:1}
  })
  res.status(201).json({
    message:"Food liked successfully",
    like
  })
}
async function savefood(req, res) {

    const { foodId } = req.body;
    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadySaved) {
        await saveModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { savesCount: -1 }
        })

        return res.status(200).json({
            message: "Food unsaved successfully"
        })
    }

    const save = await saveModel.create({
        user: user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { savesCount: 1 }
    })

    res.status(201).json({
        message: "Food saved successfully",
        save
    })

}

async function getSaveFood(req, res) {

    const user = req.user;

    const savedFoods = await saveModel.find({ user: user._id }).populate('food');

    if (!savedFoods || savedFoods.length === 0) {
        return res.status(404).json({ message: "No saved foods found" });
    }

    res.status(200).json({
        message: "Saved foods retrieved successfully",
        savedFoods
    });

}

module.exports = { createfood, getfooditem, likefood, savefood, getSaveFood };