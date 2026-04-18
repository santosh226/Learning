import { application } from "express";
import ApiResponse from "../../common/utils/api-response.js";
import * as authService from "./auth.service.js";
import ApiError from "../../common/utils/api-error.js";

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

const verifyEmail = async (req, res) => {
    const user = await authService.verifyEmail(req.params.token);
    ApiResponse.ok(res, "Email verified successfully", user);
}

const forgetPassword = async (req, res) => {
    await authService.forgotPassword(req.body.email);
    ApiResponse.ok(res, "Password reset email sent");
}

const resetPassword = async (req, res) => {
    await authService.resetPassword(req.params.token, req.body.password);
    ApiResponse.ok(res, "Password reset successfully");
}

const profile = async(req, res) => {
    const user = await authService.profile(req.user.id);
    ApiResponse.ok(res, "User profile", user);
}

const uploadAvatar = async (req, res) => {
    if(!req.file) throw ApiError.badRequest("Please upload avatar");
    console.log(req.user);
    const avatar_data = await authService.uploadAvatar(req.user.id, req.file);
    ApiResponse.created(res, "User avatar uploaded successfully", avatar_data);
}

export {
    register,
    login,
    refreshToken,
    logout,
    profile,
    verifyEmail,
    forgetPassword,
    resetPassword,
    uploadAvatar
};