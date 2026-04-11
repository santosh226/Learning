import { Router } from "express";
import * as controller from "./auth.controller.js";
import validate from "../../common/middleware/validate.middleware.js";
import RegisterDto from "./dto/register.dto.js";
import LoginDto from "./dto/login.dto.js";
import { authenitcate } from "./auth.middleware.js";

const router = Router();

router.post("/register", validate(RegisterDto), controller.register);
router.post("/login", validate(LoginDto), controller.login);
router.post("/refresh-token", controller.refreshToken);
router.post("/logout", authenitcate, controller.logout);

export default router;