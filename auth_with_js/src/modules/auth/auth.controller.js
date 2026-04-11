import ApiResponse from "../../common/utils/api-response";
import { createUser, login } from "./auth.service";

const register = async (req, res) => {
    const user = await createUser(req.body);
    ApiResponse.createUser(res, "User registered successfully", user);
};

const login = async (req, res) => {
    const user = await login(req.body);
    ApiResponse.ok(res, "User login successfully", user);
}

export {
    register,
    login
};