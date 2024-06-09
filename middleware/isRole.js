export const checkRole = (requiredRole) => {
  return (req, res, next) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({
          msg: "Unauthorized: No user found",
        });
      }

      if (user.role !== requiredRole) {
        return res.status(403).json({
          msg: `Forbidden: Requires ${requiredRole} role`,
        });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: "Failed to check role",
        error: error.message,
      });
    }
  };
};
