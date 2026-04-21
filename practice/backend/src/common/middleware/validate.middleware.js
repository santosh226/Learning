import ApiError from "../utils/api-error.js";

const validate = (DtoClass) => {
    return (req, res, next) => {
        const {error, value} = DtoClass;
        if(error) throw ApiError.badRequest(error.join("; "));

        req.body = value;

        next();
    }
}

export default validate;