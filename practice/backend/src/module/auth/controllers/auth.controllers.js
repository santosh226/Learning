import ApiError from "../../../common/utils/api-error";
import ApiResponse from "../../../common/utils/api-response.js";
import * as AuthService from "../services/auth.services.js";

const register = async (req, res) => {
        const user = await AuthService.register(req.body);
        ApiResponse.ok(res, "User registered Succecfully", user);
}

const login = async (req, res) => {
    
}

export {
    register, 
    login
}