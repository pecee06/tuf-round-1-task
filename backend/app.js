import express from "express"
import cors from "cors"
import router from "./router.js"

const app = express()

// middlewares
app.use(cors())
app.use(express.urlencoded({extended: true}))   // for accepting form data
app.use(express.json()) // for accepting json data

// routes
app.use("/api",router)

export default app