import express from "express";
import { ImageController } from "../controller/ImageController.js";
import upload from "../middleware/multer.middleware.js";

const imageRouter = express.Router()

imageRouter.get('/get-image',ImageController.getAllImage)
imageRouter.get('/get-image-user',ImageController.getImageByUserId)
imageRouter.get('/get-image-page/:page',ImageController.getAllImagePaging)
imageRouter.get('/search-image/:key',ImageController.searchImage)
imageRouter.get('/get-comment/:imageId',ImageController.getCommentByImage)
imageRouter.get('/get-comment-paging/:imageId/:page',ImageController.getCommentByIdPage)
imageRouter.get('/get-save-image',ImageController.getSaveImageByUserId)
imageRouter.post('/add-image',upload.single('image'),ImageController.addNewImage)
imageRouter.post('/add-comment',ImageController.addNewComment)
imageRouter.post('/save-image/:imageId',ImageController.saveImageByUserId)
imageRouter.put('/image-update/:imageId',ImageController.updateImage)
imageRouter.put('/image-comment-update/:commentId',ImageController.updateComment)
imageRouter.delete('/image-delete/:imageId',ImageController.deleteImage)
imageRouter.delete('/image-comment-delete/:commentId',ImageController.deleteComment)
imageRouter.delete('/delete-save-image/:imageId',ImageController.deleteSaveImage)

export default imageRouter
