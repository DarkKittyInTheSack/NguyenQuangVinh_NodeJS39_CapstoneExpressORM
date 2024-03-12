import express from 'express'
import cors from 'cors'
import mainRouter from './src/router/mainRouter.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extends: true}))
app.use(cors())
app.listen(8080)
app.use(mainRouter)