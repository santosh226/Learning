import crypto from "crypto";

const generateResetToken = () => {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  return { rawToken, hashedToken };
};

const generateAccessToken = (payload) => {
    return Jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m"});
}

const generateRefreshToken = (payload) => {
    return Jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d"});
}

export {
    generateResetToken,
    generateAccessToken,
    generateRefreshToken
}