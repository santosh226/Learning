class ApiError extends Error {
    constructor(statuscode, message) {
        super(message);
        this.statuscode = statuscode;
    }

    static conflict(message = "Conflict") {
        return new ApiError(409, message);
    }
}

export default ApiError;

