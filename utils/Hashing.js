import * as argon2 from "argon2";
import logger from "./Logger.js";

export const hashPassword = async (password) => {
  const salt = await argon2.hash(password);
  return salt;
};

export const comparePassword = async (suppliedPassword, storedHash) => {
  try {
    return await argon2.verify(storedHash, suppliedPassword);
  } catch (error) {
    logger.error(error);
    throw new Error("Verification failed");
  }
};
