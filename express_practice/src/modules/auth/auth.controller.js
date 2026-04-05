import ApiResponse from "../../common/utils/api-response.js"
import * as authService from "../auth/auth.service.js";
import cookie from "cookie-parser";

const register = async (req, res) =>  {
    const user = await authService.register(req.body);
    ApiResponse.created(res, "Registration success", user);
}

const login = async(req, res) => {
    const {user, accessToken, refreshToken} = await authService.login(req.body);
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    ApiResponse.ok(res, "Login successful", { user, accessToken });
}

const logout = async(req, res) => {
    await authService.logout(req.user.id);
    res.clearCookie("refreshToken");
    ApiResponse.ok(res, "Logout Success");
}

const getMe = async(req, res) => {
    const user = await authService.getMe(req.user.id);
    ApiResponse.ok(res, "User Profile", user);
}

export {register, getMe, logout, login};