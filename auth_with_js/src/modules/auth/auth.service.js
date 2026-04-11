import crypto from "crypto";
import { sendVerificationEmail } from "../../common/config/email.js";
import ApiError from "../../common/utils/api-error.js";
import User from "./auth.models.js";
import { generateAccessToken, generateResetToken, verifyRefreshToken } from "../../common/utils/jwt.utils.js";

const hashToken = (token) => {
    crypto.createHash("sha256").update(token).digest("hex");
}

const createUser = async({name, email, password, role}) => {
    const isUserExist = await User.findOne({email});
    if(isUserExist) throw ApiError.conflict("Email already exist");

    const {rawToken, hashedToken} = generateResetToken();

    const user = await User.create({
        name,
        email,
        password,
        role,
        verificationToken: hashedToken
    });

    try {
        await sendVerificationEmail(email, rawToken);
    } catch (error) {
        console.error(`Failed to send verification email: ${error.message}`);
    };

    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.verificationToken;

    return userObj;
};

const login = async ({email, password}) => {
    const user = await User.findOne({email});
    if(!user) throw ApiError.notFound("Invalid Email");

    const isPasswordMatch = await user.comparePassword(password);
    if(!isPasswordMatch) throw ApiError.forbidden("Invalid Password")

    if(!user.isVerified) {
        throw ApiError.forbidden("Please verify you email before loggin in");
    }

    const accessToken = generateAccessToken({id: user._id, role: user.role});
    const refreshToken = generateResetToken({id: user._id});

    user.refreshToken = hashToken(refreshToken);
    await user.save({validateBeforeSave: false});

    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.refreshToken;

    return {
        user: userObj, accessToken, refreshToken
    };
};

const refreshToken = async (token) => {
    if(!token) throw ApiError.unauthorized("Refresh token missing");

    const decoded = verifyRefreshToken(token);

    const user = await User.findById(decoded.id).select("+refreshToken");
    if(!user) throw ApiError.unauthorized("User no longer exist");

    if(user.refreshToken !== hashToken(token)) {
        throw ApiError.unauthorized("Invalid refresh token — please log in again");
    };

    const accessToken = generateAccessToken({id: user._id, role: user.role});
    return { accessToken };
};

const logout = async (userId) => {
    await User.findByIdAndUpdate(userId, {refreshToken: null});
};

export {
    createUser,
    login,
    refreshToken,
    logout,
};