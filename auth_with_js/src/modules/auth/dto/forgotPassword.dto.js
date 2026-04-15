import BaseDto from "../../../common/dto/base.dto";
import Joi from "joi";

class forgotPasswordDto extends BaseDto {
    static schema = Joi.object({
        email: Joi.string().lowercase().email().required()
    })
};

export default forgotPasswordDto;
