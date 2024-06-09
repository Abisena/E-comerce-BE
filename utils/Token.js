import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.TOKEN_SECRET, { expiresIn: "1h" });
};

export const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (err) {
    throw new Error("Invalid Token");
  }
};

export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    throw new Error("Invalid Refresh Token");
  }
};
