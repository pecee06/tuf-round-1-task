import {asyncWrapper, decodeToken, ApiError} from "../utils/utils.js"
import {userTable} from "../constants.js"
import {connection} from "../index.js"

const isLoggedIn = asyncWrapper(async (req,res,next)=>{
    const accessToken = req.cookies.access_token
    if (!accessToken) {
        throw new ApiError({
            message: "Unauthorized request",
            statusCode: 401
        })
    }
    const decodedToken = decodeToken(accessToken)
    const result1 = await connection.query(`
        SELECT *
        FROM ${userTable}
        WHERE username = "${decodedToken.username}";
    `)
    if (!result1[0].length){
        // Fetch refresh_token from DB
        throw new ApiError({
            message: "Invalid access token",
            statusCode: 401
        })
    }
    req.username = decodedToken.username
    next()
})

export default isLoggedIn