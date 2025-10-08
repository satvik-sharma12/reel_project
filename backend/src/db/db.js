const mongoose=require('mongoose')

function connectdb(){
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("Mongo Connect")
    })
    .catch((error)=>{
        console.log("Error Occured")
    })
    
}

module.exports=connectdb