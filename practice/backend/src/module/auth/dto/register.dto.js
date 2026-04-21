import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js";

class RegisterDto extends BaseDto {
    static schema = Joi.object({
        name: Joi.string().required().trim().min(2).max(50),
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,50}$')).trim().min(6).max(50).required(),
        role: Joi.string().valid("customer", "admin", "seller").default("customer"),
    })
}

export default RegisterDto;