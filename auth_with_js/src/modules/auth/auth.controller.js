import ApiResponse from "../../common/utils/api-response";
import { createUser, login, refreshToken } from "./auth.service";

const register = async (req, res) => {
    const user = await createUser(req.body);
    ApiResponse.createUser(res, "User registered successfully", user);
};

const login = async (req, res) => {
    const user = await login(req.body);
    ApiResponse.ok(res, "User login successfully", user);
}

const refreshToken = async (req, res) => {
    const { accessToken } = await refreshToken(req.cookies?.refreshToken);
    ApiResponse(res, "Token refresh successfully", accessToken);
}

const logout = async (req, res) => {

}

export {
    register,
    login,
    refreshToken,
    logout
};