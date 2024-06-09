import { prisma } from "../config/prisma.js";
import { hashPassword, comparePassword } from "../utils/Hashing.js";
import { generateToken } from "../utils/Token.js";
import { validateEmail, validatePassword } from "../utils/Validation.js";
import { handleError } from "../utils/Handling.js";
import { sendEmail } from "../utils/EmailService.js";
import logger from "../utils/Logger.js";
export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({ msg: "Invalid email format" });
    }

    // Validate password criteria
    if (!validatePassword(password)) {
      return res.status(400).json({ msg: "Password does not meet criteria" });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);
    const userCount = await prisma.user.count();
    let userRole = "User"; // Default role

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

    sendEmail(email, "Welcome!", "Thank you for registering!");

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

    const token = generateToken(user.userId);

    res.status(200).json({ msg: "Login successful", token });
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
