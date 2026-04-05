import {Router} from "express";
import * as controller from "./auth.controller";
import validate from "../../common/middleware/validate.middleware";
import RegisterDto from "./dto/register.dto";
import LoginDto from "./dto/login.dto";

const router = Router();

router.post("/register", validate(RegisterDto), controller.register);
router.post("/login", validate(LoginDto), controller.login);
router.post("/logout", authenticate, controller.logout);

router.get("/Me", authenticate, controller.getMe);
router.get("/verify-email/:token", controller.getMe);
export default router;