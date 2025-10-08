const ImageKit=require("imagekit")

const imagekit= new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, 
  urlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT,
  publicKey:process.env.IMAGEKIT_PUBLIC_KEY
});

async function fileUpload(file,fileName){
    const result=imagekit.upload({
        file:file,
        fileName:fileName,
    })
    return result
}

module.exports={fileUpload}