import jwt from "jsonwebtoken"

const decodeToken = (token)=>{
    return jwt.verify(
        token,
        process.env.TOKEN_SECRET
    )
}

export default decodeToken