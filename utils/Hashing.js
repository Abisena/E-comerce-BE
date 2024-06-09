import * as argon2 from "argon2";

export const hashPassword = async (password) => {
  const salt = await argon2.hash(password);
  return salt;
};

export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
