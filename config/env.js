// src/config/config.js
import dotenv from "dotenv";

dotenv.config();

export const { PORT, DATABASE_URL, TOKEN_SECRET, EMAIL_USER, EMAIL_PASS } =
  process.env;
