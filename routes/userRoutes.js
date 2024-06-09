import { register, login, logout } from "../service/Users.js";
import { isAuthenticated } from "../middleware/isAuthorize.js";
import { validateRegisterInput } from "../helpers/validate.js";
import express from "express";
const user = express.Router();

user.post("/register", validateRegisterInput, register);
user.post("/login", login);
user.post("/logout", logout);
user.get("/protected-route", isAuthenticated, (req, res) => {
  res.send("This is a protected route");
});

export default user;
