import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import cardRouter from "./api/routes/card.router.js"
import userRouter from "./api/routes/user.router.js"

const app = express()

// middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))   // for accepting form data
app.use(express.json()) // for accepting json data

// routes
app.use("/api/user",userRouter)
app.use("/api/card",cardRouter)

export default app