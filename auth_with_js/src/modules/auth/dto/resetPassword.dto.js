import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto";

class ResetPasswordDto extends BaseDto{
    static schema = Joi.object({
        password: Joi.string().pattern(/(?=.*[A-Z])(?=.*\d)/).message("Password must contain atleast one uppercase and one digit").min(6).max(20).required()
    });
};

export default ResetPasswordDto;