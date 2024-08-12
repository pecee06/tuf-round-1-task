import {connection} from "../../index.js"
import {asyncWrapper,ApiResponse,ApiError} from "../../utils/utils.js"
import {cardTable} from "../../constants.js"

export const addCard = asyncWrapper(async (req, res) => {
    const {term, definition} = req.body
    const result = await connection.query(`
        INSERT INTO ${cardTable} VALUES(
            "${Math.ceil(Math.random()*1e7)}","${term}","${definition}"
        );
    `)
    if (!result){
        throw new ApiError({
            message: "Unable to add card",
            statusCode: 500
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
        UPDATE ${cardTable} SET term = "${term}", definition = "${definition}"
        WHERE id = ${id};
    `)
    if (!result){
        throw new ApiError({
            message: "Unable to update card",
            statusCode: 500
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
        DELETE FROM ${cardTable} WHERE id = ${id};
    `)
    if (!result){
        throw new ApiError({
            message: "Unable to delete card",
            statusCode: 500
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