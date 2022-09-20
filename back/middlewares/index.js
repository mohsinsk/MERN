const jwt = require("jsonwebtoken");

const excludedPaths = ["/login"];

module.exports = {
  validateToken: (req, res, next) => {
    if (!excludedPaths.includes(req.path)) {
      let token = req.cookies.refreshToken;
      console.log(token);

      if (!token)
        return res.json({ success: false, message: "No token provided" });

      if (!jwt.verify(token, process.env.ACCESS_SECRET_KEY))
        return res.json({ success: false, message: "Unauthorized access" });
    }

    next();
  },
};
