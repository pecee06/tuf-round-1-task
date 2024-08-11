import dotenv from "dotenv"
dotenv.config()
import app from "./app.js"
import {connect} from "./db.js"

const connection = await connect()
if (connection){
    console.log("Database connection successful")
    app.listen(process.env.PORT,()=>{
        console.log(`Server is live at localhost:${process.env.PORT}`)
    })
}
else console.log("Connection Failed")

export {connection}