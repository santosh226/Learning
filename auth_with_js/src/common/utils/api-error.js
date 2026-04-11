class ApiError extends Error {
    constructor(statuscode, message) {
        super(message);
        this.statuscode = statuscode;
    };

    static conflict(message = "Conflict") {
        return new ApiError(409, message);
    };

    static notFound(message = "Not Found") {
        return new ApiError(404, message);
    };

    static forbidden(message = "Forbidden") {
        return new ApiError(412, message);
    };

    static badRequest(message = "Bad request") {
        return new ApiError(400, message);
    };

    static unauthorized(message = "Unauthorized") {
        return new ApiError(401, message);
    };
};

export default ApiError;