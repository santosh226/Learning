import ApiResponse from "../../common/utils/api-response.js"
import * as authService from "../auth/auth.service.js";

const register = async (req, res) =>  {
    const user = await authService.register(req.body);
    ApiResponse.created(res, "Registration success", user);
}

export {register};