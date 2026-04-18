import ApiError from "../utils/api-error.js";

const validate = (DtoClass) => {
    return (req, _, next) => {
        const {errors, value} = DtoClass;
        if(errors) throw ApiError.badRequest(errors.join("; "));
        req.body = value;
        next();
    };
};

export default validate;