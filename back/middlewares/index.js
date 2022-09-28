const jwt = require("jsonwebtoken");

const excludedPaths = ["/login", "/refresh"];

module.exports = {
  validateToken: (req, res, next) => {
    if (!excludedPaths.includes(req.path)) {
      let token = req.cookies.accessToken;

      if (!token)
        return res
          .status(401)
          .json({ success: false, message: "No token provided" });

      if (!jwt.verify(token, process.env.ACCESS_SECRET_KEY))
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized access" });
    }

    next();
  },
};
