import cookieParser from "cookie-parser";
import ApiError from "../../common/utils/api-error.js";
import ApiResponse from "../../common/utils/api-response.js";
import * as AuthService from "./auth.services.js";

const register = async (req, res) => {
        const user = await AuthService.register(req.body);
        ApiResponse.ok(res, "User registered Succecfully", user);
}

const login = async (req, res) => {
    const {accessToken, refreshToken, user} = AuthService.login(req.body);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    
    ApiResponse.ok(res, "login successfully", {user, accessToken});
}

export {
    register, 
    login
}