import express from "express";
import authRouter from "./authRouter.js";
import imageRouter from "./imageRouter.js";

const mainRouter = express.Router()

mainRouter.use('/auth',authRouter)
mainRouter.use('/image',imageRouter)

export default mainRouter