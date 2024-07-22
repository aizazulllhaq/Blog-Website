class ApiError extends Error {
    constructor(statusCode, message, success) {
        super();

        this.statusCode = statusCode;
        this.message = message;
        this.success = success;
    }
}

export default ApiError;
