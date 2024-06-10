export const isAuthenticated = (req, res, next) => {
  const refreshToken = req.headers["authorization"];
  if (!refreshToken) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ msg: "Invalid Token" });
    }

    req.userId = decoded.userId;
    next();
  });
};

export const Authenticate = (req, res, next) => {
  if (req.session && req.session.user) {
    req.user = req.session.user;
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
