import jwt from "jsonwebtoken"
import {accessTokenExpiry, refreshTokenExpiry} from "../constants.js"

const generateToken = (data={}, isRefreshToken=false)=>{
    return jwt.sign(
        data,
        process.env.TOKEN_SECRET,
        {expiresIn: isRefreshToken ? refreshTokenExpiry : accessTokenExpiry}
    )
}

export default generateToken