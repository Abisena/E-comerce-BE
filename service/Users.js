import { prisma } from "../config/prisma.js";
import { hashPassword, comparePassword } from "../utils/Hashing.js";
import { generateToken, generateRefreshToken } from "../utils/Token.js";
import { validateEmail, validatePassword } from "../utils/Validation.js";
import { handleError } from "../utils/Handling.js";
import { sendEmail, sendOtp } from "../utils/EmailService.js";
import logger from "../utils/Logger.js";
import { generateOTP } from "../utils/OTP.js";
export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({ msg: "Invalid email format" });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({ msg: "Password does not meet criteria" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ msg: "Email is already in use" });
    }

    const hashedPassword = await hashPassword(password);
    const userCount = await prisma.user.count();
    let userRole = "User";

    if (userCount === 0) {
      userRole = "Admin";
    } else if (userCount > 0 && role) {
      if (role === "Penjual") {
        userRole = "Penjual";
      } else if (role === "User") {
        userRole = "User";
      } else {
        return res.status(400).json({ msg: "Invalid role provided" });
      }
    }
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: userRole,
      },
    });

    sendEmail(email, "Welcome!", "welcomeEmail.html", { username });

    res
      .status(201)
      .json({ msg: "User registered successfully", data: newUser });
  } catch (error) {
    // Handle errors
    logger.error(error);
    handleError(error, res);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    const validPassword = await comparePassword(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    const accessToken = generateToken(user.userId);
    const refreshToken = generateRefreshToken(user.userId);
    await prisma.user.update({
      where: { userId: user.userId },
      data: { refreshToken },
    });

    res
      .status(200)
      .json({ msg: "Login successful", accessToken, refreshToken });
  } catch (err) {
    handleError(err, res);
  }
};

export const logout = async (req, res) => {
  const { userId } = req.user;
  try {
    await prisma.user.update({
      where: { userId },
      data: { refreshToken: null },
    });
    res.status(200).json({ msg: "User logged out successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Failed to logout user", error: error.message });
  }
};

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const otp = generateOTP();

    await prisma.user.update({
      where: { userId: user.userId },
      data: { otp },
    });

    // Kirim email dengan otp dan username
    sendOtp(email, "Password Reset OTP", "resetPasswordEmail.html", {
      otp,
      username: user.username,
    });

    res.status(200).json({ msg: "OTP sent to your email" });
  } catch (error) {
    console.error(error);
    handleError(error, res);
  }
};

export const verifyOTPAndResetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (otp !== user.otp) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
      where: { userId: user.userId },
      data: { password: hashedPassword, otp: null },
    });

    res.status(200).json({ msg: "Password reset successful" });
  } catch (error) {
    console.error(error);
    handleError(error, res);
  }
};
