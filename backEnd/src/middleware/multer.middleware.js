import multer from 'multer'

const storage = multer.diskStorage({
    filename: (req,file,cb) =>{
        cb(null,file.originalname)
    }
})

const fileFilter = (req,file,cb) =>{
    const imageType = ['image/jpeg','image/png','image/jpg']

    if(imageType.includes(file.mimetype)){
        cb(null,true)
    }else{
        const res = {
            status: 400,
            description: 'Bad request',
            result: 'Only JPEG and PNG required'
        }

        cb(JSON.stringify(res,null,2),false)
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})

export default upload