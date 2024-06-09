import { validateEmail, validatePassword } from "../utils/Validation.js";

export const validateRegisterInput = (req, res, next) => {
  const { email, password } = req.body;

  if (!validateEmail(email)) {
    return res.status(400).json({ msg: "Invalid email format" });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({ msg: "Password does not meet criteria" });
  }

  next();
};
