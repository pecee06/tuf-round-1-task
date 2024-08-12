import bcrypt from "bcryptjs"
import {hashingRounds} from "../constants.js"

const encrypt = async (plainText)=>{
    return await bcrypt.hash(plainText, hashingRounds)
}

export default encrypt