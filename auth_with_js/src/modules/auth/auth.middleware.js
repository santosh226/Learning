import ApiError from "../../common/utils/api-error";
import { verifyAccessToken } from "../../common/utils/jwt.utils";
import User from "../../common/utils/jwt.utils.js";

const authenitcate = async (req, res, next) => {
    let token;

    if (req.headers.authorization?.startWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token) {
        throw ApiError.unauthorized("Not aunthenticated");
    }
    
    const decoded = verifyAccessToken(token);
    const user = await User.findbyId(decoded.id);
    if(!user) throw ApiError.unauthorized("User no longer exist");

    req.user = {
        id: user._id,
        role: user.role,
        name: user.name,
        email: user.email
    };

    next();
};

export {
    authenitcate,
}