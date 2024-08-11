import {connection} from "./index.js"
import asyncWrapper from "./utils/asyncWrapper.js"
import ApiResponse from "./utils/ApiResponse.js"
import ApiError from "./utils/ApiError.js"
import {tableName} from "./constants.js"

export const addCard = asyncWrapper(async (req, res) => {
    const {term, definition} = req.body
    const result = await connection.query(`
        INSERT INTO ${tableName} (term,definition) VALUES(
            "${term}","${definition}"
        );
    `)
    if (!result){
        throw new ApiError({
            message: "Unable to add card",
            statusCode: 400
        })
    }
    res
    .status(200)
    .json(
        new ApiResponse({
            statusCode: 200,
            message: "Card added successfully"
        })
    )
})

export const updateCard = asyncWrapper(async (req, res) => {
    const {id, term, definition} = req.body
    const result = await connection.query(`
        UPDATE ${tableName} SET term = "${term}", definition = "${definition}"
        WHERE id = ${id};
    `)
    if (!result){
        throw new ApiError({
            message: "Unable to update card",
            statusCode: 400
        })
    }
    res
    .status(200)
    .json(
        new ApiResponse({
            statusCode: 200,
            message: "Card updated successfully"
        })
    )
})

export const deleteCard = asyncWrapper(async (req, res) => {
    const {id} = req.body
    const result = await connection.query(`
        DELETE FROM ${tableName} WHERE id = ${id};
    `)
    if (!result){
        throw new ApiError({
            message: "Unable to delete card",
            statusCode: 400
        })
    }
    res
    .status(200)
    .json(
        new ApiResponse({
            statusCode: 200,
            message: "Card deleted successfully"
        })
    )
})