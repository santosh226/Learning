import ApiResponse from "../../common/utils/api-response.js";
import * as authService from "./auth.service.js";

const register = async (req, res) => {
    const user = await authService.createUser(req.body);
    ApiResponse.createUser(res, "User registered successfully", user);
};

const login = async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.login(req.body);

  // Refresh token goes in httpOnly cookie — not accessible to JS
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
  });

  ApiResponse.ok(res, "Login successful", { user, accessToken });
};

const refreshToken = async (req, res) => {
    const { accessToken } = await authService.refreshToken(req.cookies?.refreshToken);
    ApiResponse(res, "Token refresh successfully", accessToken);
}

const logout = async (req, res) => {
    await authService.logout(req.user.id);
    res.clearCookie("refreshToken");
    ApiResponse.ok(res, "Logout successfull");
}

const profile = async(req, res) => {
    const user = await authService.profile(req.user.id);
    ApiResponse.ok(res, "User profile", user);
}

export {
    register,
    login,
    refreshToken,
    logout,
    profile
};