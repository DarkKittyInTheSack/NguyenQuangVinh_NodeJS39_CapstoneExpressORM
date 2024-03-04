import express from 'express'
import { AuthController } from '../controller/AuthController.js'

const authRouter = express.Router()

authRouter.get('/get-all-user',AuthController.getAllUser)
authRouter.get('/get-user',AuthController.getUserInformation)
authRouter.get('/get-user-profile/:userId',AuthController.getUserById)
authRouter.get('/reset-login-token',AuthController.resetLoginToken)

authRouter.post('/login', AuthController.loginUser)
authRouter.post('/register', AuthController.registerUser)
authRouter.post('/change-password/:email', AuthController.changePassword)
authRouter.put('/update', AuthController.updateUserInformation)

export default authRouter