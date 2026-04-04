import ApiError from "../../common/utils/api-error";
import { generateAccessToken, generateRefreshToken, generateResetToken, verifyAccessToken, verifyRefreshToken } from "../../common/utils/jwt.utils";
import User from "../auth/auth.models";

const hashToken = (token) => {
    crypto.createHash("sha256").update(token.digest("hex"));
}

const register = async ({name, email, password, role}) => {
    const existing = await User.findOne({email});
    if(existing) {
        throw ApiError.conflict("Email already exists");
    }

    const {rawToken, hashedToken} = generateResetToken();
    const user = await User.create({
        name,
        email,
        password,
        role,
        verificationToken: hashedToken
    })

    const userObj = user.toObject()
    delete userObj.password
    delete userObj.verificationToken

    return userObj;
}

const login = async({email, password}) => {
    const user = await User.findOne({email}).select("+password");
    if(!user) throw ApiError.unauthorized("User not found");

    if(!user.isVerified) throw ApiError.forbidden("Please verify your email before login");

    const accessToken = generateAccessToken({id: user._id, role: user.role});
    const refreshToken = generateRefreshToken({id: user._id});

    user.refreshtoken = hashToken(refreshToken);
    await user.save({validateBeforeSave: false});

    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.refreshtoken;

    return {
        user: userObj, 
        accessToken,
        refreshToken
    }
}

const refresh = async (token) => {
    if(!token) throw ApiError.unauthorized("Refresh token missing");
    const decoded = jwt.decoded(token);

    const user = await User.findById(decoded.id).select("+refreshToken");
    if(!user) throw ApiError.unauthorized("User not found");

    if(User.refreshToken !== hashToken(token)) {
        throw ApiError.unauthorized("Invalid refresh token");
    }

    const accessToken = generateAccessToken({id: user._id, role: user.role});

    return {accessToken};
}

const logout = async (userId) => {
    await User.findByIdAndUpdate(userId, {refreshToken: null});
}

const forgotPassword = async(email) => {
    const user = await User.findOne({email});
    if(!user) throw ApiError.notfound("No account with that email");

    const {rasToken, hashedToken} = generateResetToken();
    user.resetPasswordtoken = hashedToken;
    user.resetpasswordExpires = Date.now() + 15 * 60 * 1000;

    await user.save();
}

export {register, login, refresh, logout, forgotPassword};