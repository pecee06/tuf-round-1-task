import {connection} from "../../index.js"
import asyncWrapper from "../../utils/asyncWrapper.js"
import {ApiResponse, ApiError, encrypt, decrypt, generateToken} from "../../utils/utils.js"
import {userTable, cookieOptions, accessTokenExpiry} from "../../constants.js"

export const signup = asyncWrapper(async (req,res)=>{
    const {username,password} = req.body
    const encryptedPassword = await encrypt(password)
    const result = await connection.query(`
        INSERT INTO ${userTable} (username,password) VALUES(
            "${username}","${encryptedPassword}"
        );
    `)
    if (!result){
        throw new ApiError({
            message: "Unable to register user",
            statusCode: 500
        })
    }
    res
    .status(200)
    .json(
        new ApiResponse({
            statusCode: 200,
            message: "User registered successfully"
        })
    )
})

export const loginState = asyncWrapper((req,res)=>{
    if (req.cookies.access_token){
        res
        .status(200)
        .json(
            new ApiResponse({
                statusCode: 200,
                data: {accessToken: req.cookies.access_token}
            })
        )
    }
    else{
        res
        .status(200)
        .json(
            new ApiResponse({
                statusCode: 200,
                message: "User not logged in"
            })
        )
    }
})

export const login = asyncWrapper(async (req,res)=>{
    const {username,password} = req.body
    const result1 = await connection.query(`
        SELECT *
        FROM ${userTable}
        WHERE username = "${username}";
    `)
    if (!result1[0].length){
        throw new ApiError({
            message: "User is not registered",
            statusCode: 400
        })
    }
    const result2 = await connection.query(`
        SELECT password
        FROM ${userTable}
        WHERE username = "${username}";
    `)
    if (await decrypt(password, result2[0][0].password) == false){
        throw new ApiError({
            message: "Incorrect password",
            statusCode: 400
        })
    }
    const accessToken = generateToken({username})
    const refreshToken = generateToken({username},true)
    await connection.query(`
        UPDATE ${userTable}
        SET refresh_token = "${refreshToken}"
        WHERE username = "${username}"
    `)
    res
    .status(200)
    .cookie("access_token", accessToken, cookieOptions)
    .json(
        new ApiResponse({
            statusCode: 200,
            message: "User logged in successfully"
        })
    )
})

export const logout = asyncWrapper(async (req,res)=>{
    await connection.query(`
        UPDATE ${userTable}
        SET refresh_token = NULL
        WHERE username = "${req.username}";
    `)

    res
    .status(200)
    .clearCookie("access_token", cookieOptions)
    .json(
        new ApiResponse({
            message: "User logged out succesfully",
            statusCode: 200
        })
    )
})