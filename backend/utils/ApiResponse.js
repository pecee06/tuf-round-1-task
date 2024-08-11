class ApiResponse{
    constructor({
        data={},
        message,
        statusCode
    }){
        this.data = data
        this.message = message
        this.statusCode = statusCode
    }
}

export default ApiResponse