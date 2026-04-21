import User from "../models/auth.models.js";
import ApiError from "../../../common/utils/api-error.js";
import { generateResetToken } from "../../../common/utils/jwt.utils.js";
import { sendVerificationEmail } from "../../../common/config/email.js";

const hashToken = (token) => {
    return crypto.createHash("sha256").update(token).digest("hex");
}

const register = async ({name, email, password, role}) => {
    const user = await User.findOne({email});
    if(user) throw ApiError.conflict(`${email} already exist`);

    const {rawToken, hashedToken} = generateResetToken();

    const newUser = await User.create({
        name,
        email,
        password,
        role,
        verificationToken: hashedToken
    })

    try {
        await sendVerificationEmail(email, rawToken);
    } catch (error) {
        console.error(`Failed to send verification email, Error: ${error.message}`);
    }

    const userObj = newUser.toObject();
    delete userObj.verificationToken;
    delete userObj.password;

    return userObj;
}

const verifyEmail = async (token) => {
    const hashedToken = hashToken(token);

    const user = await User.findOne({verificationToken: hashedToken});
    if(!user) throw ApiError.notFound("Invalid or expired verification token")

    user.isVerified = true;
    user.verificationToken = undefined;

    await user.save({validateBeforeSave: false});
    
    return user;
}

const login = async () => {
    
}

export {
    register,
    login
}