import {
  register,
  login,
  logout,
  requestPasswordReset,
  verifyOTPAndResetPassword,
} from "../service/Users.js";
import { isAuthenticated } from "../middleware/isAuthorize.js";
import { validateRegisterInput } from "../helpers/validate.js";
import express from "express";
const user = express.Router();

user.post("/register", validateRegisterInput, register);
user.post("/login", login);
user.post("/logout", logout);
user.post("/reset-password/request", (req, res) => {
  const { email } = req.body;
  requestPasswordReset(req, res, email);
});

user.post("/reset-password/verify", (req, res) => {
  const { email, otp, newPassword } = req.body;
  verifyOTPAndResetPassword(req, res, email, otp, newPassword);
});
user.get("/protected-route", isAuthenticated, (req, res) => {
  res.send("This is a protected route");
});

export default user;
