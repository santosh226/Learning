import crypto from "crypto";
import Jwt from "jsonwebtoken";

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
};

const verifyAccessToken = (token) => {
  return Jwt.verify(token, process.env.JWT_ACCESS_SECRET);
};

const generateRefreshToken = (payload) => {
    return Jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d"});
};

const verifyRefreshToken = (token) => {
  return Jwt.verify(token, process.env.JWT_REFRESH_SECRET);
;}



export {
    generateResetToken,
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
};