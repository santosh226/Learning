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
    }
};

export default ApiError;