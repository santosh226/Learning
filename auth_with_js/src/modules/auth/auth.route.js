import { Router } from "express";
import * as controller from "./auth.controller.js";
import validate from "../../common/middleware/validate.middleware.js";
import RegisterDto from "./dto/register.dto.js";
import LoginDto from "./dto/login.dto.js";
import { authenitcate } from "./auth.middleware.js";
import forgotPasswordDto from "./dto/forgotPassword.dto.js";
import ResetPasswordDto from "./dto/resetPassword.dto.js";
import { upload } from "../../common/middleware/multer.middleware.js";

const router = Router();

router.post("/register", validate(RegisterDto), controller.register);
router.post("/login", validate(LoginDto), controller.login);

router.post("/refresh-token", controller.refreshToken);

router.post("/logout", authenitcate, controller.logout);

router.get("/verify-email/:token", controller.verifyEmail);

router.post("/forgot-password", validate(forgotPasswordDto), controller.forgetPassword);
router.put("/reset-password", validate(ResetPasswordDto), controller.resetPassword);

router.get("/profile", authenitcate, controller.profile);

router.post("/avatar", authenitcate, upload.single("avatar"),  controller.uploadAvatar);

export default router;