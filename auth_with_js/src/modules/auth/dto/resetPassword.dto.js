import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js";

class ResetPasswordDto extends BaseDto{
    static schema = Joi.object({
        password: Joi.string()
        .pattern(/(?=.*[A-Z])(?=.*\d)/)
        .min(6)
        .max(20)
        .required()
        .messages({
            "string.pattern.base": "Password must contain at least one uppercase letter and one digit"
        })
    });
};

export default ResetPasswordDto;