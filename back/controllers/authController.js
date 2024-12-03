const tokenUtils = require("../utils");

module.exports = {
  login: (req, res) => {
    const { username, password } = req.body;

    // Hardcoded credentials for testing (use a database in production)
    if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
      const token = tokenUtils.generateToken({ username }, "15m");
      const refreshToken = tokenUtils.generateRefreshToken({ username }, "7d");
      return res
        .status(200)
        .cookie("accessToken", token, {
          httpOnly: true,
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
          path: "/",
          expires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
          path: "/refresh",
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        })
        .json({ success: true });
    }

    return res.status(401).json({ success: false, message: "Invalid credentials" });
  },

  logout: (req, res) => {
    return res
      .clearCookie("refreshToken", { path: "/refresh" })
      .clearCookie("accessToken", { path: "/" })
      .status(200)
      .json({ success: true });
  },

  refresh: (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(400).json({ success: false, message: "No refresh token provided" });
    }

    try {
      const payload = tokenUtils.validateRefreshToken(refreshToken);
      if (!payload) {
        return res.status(401).json({ success: false, message: "Invalid refresh token" });
      }

      const { username } = payload;
      const token = tokenUtils.generateToken({ username }, "15m");
      const newRefreshToken = tokenUtils.generateRefreshToken({ username }, "7d");

      return res
        .status(200)
        .cookie("accessToken", token, {
          httpOnly: true,
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
          path: "/",
          expires: new Date(Date.now() + 15 * 60 * 1000),
        })
        .cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
          path: "/refresh",
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        })
        .json({ success: true });
    } catch (err) {
      return res.status(401).json({ success: false, message: "Invalid refresh token" });
    }
  },
};