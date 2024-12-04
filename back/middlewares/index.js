const jwt = require("jsonwebtoken");

const excludedPaths = ["/login", "/refresh"];

module.exports = {
  validateToken: (req, res, next) => {
    // Exclude specified paths from validation
    if (!excludedPaths.includes(req.path)) {
      const token = req.cookies.accessToken;

      if (!token) {
        return res
          .status(401)
          .json({ success: false, message: "No token provided" });
      }

      try {
        // Verify token using the secret key
        jwt.verify(token, process.env.ACCESS_SECRET_KEY);
      } catch (err) {
        // Handle verification errors
        return res.status(401).json({
          success: false,
          message: err.name === "TokenExpiredError" 
            ? "Token has expired" 
            : "Unauthorized access",
        });
      }
    }

    next();
  },
};