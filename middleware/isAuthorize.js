export const isAuthenticated = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  jwt.verify(token, process.env.TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).json({ msg: "Invalid Token" });
    }

    req.userId = decoded.userId;
    next();
  });
};
