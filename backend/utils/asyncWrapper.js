import ApiResponse from "./ApiResponse.js"

const asyncWrapper = (f = async () => {}) => async (req, res, next) => {
    try {
        await f(req, res, next)
    } catch (error) {
        let code = error.statusCode || 500
        res
        .status(code)
        .json(
            new ApiResponse({
                message: error.message,
                statusCode: code
            })
        )
    }
}

export default asyncWrapper