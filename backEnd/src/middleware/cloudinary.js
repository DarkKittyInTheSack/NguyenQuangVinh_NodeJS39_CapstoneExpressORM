import dotenv from 'dotenv'
import cloudinary from 'cloudinary'

dotenv.config()
const cloudinaries = cloudinary.v2

cloudinaries.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
})

const uploadFile = (file,folder) =>{
    return new Promise((resolve,reject) =>{
        cloudinaries.uploader.upload(file,{folder}, (err,result) =>{
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        })
    })
}

export default uploadFile