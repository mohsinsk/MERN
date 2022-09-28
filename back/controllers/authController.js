const tokenUtils = require("../utils");

module.exports = {
  login: (req, res) => {
    const { username, password } = req.body;

    if (username === "1mohsin.sk@gmail.com" && password === "mohsin") {
      const token = tokenUtils.generateToken({ username }, "1h");
      const refreshToken = tokenUtils.generateRefreshToken({ username }, "1h");
      return res
        .status(200)
        .cookie("accessToken", token, {
          httpOnly: true,
          sameSite: "strict",
          secure: true,
          path: "/",
          expires: new Date(Date.now() + 3 * 1000),
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
          secure: true,
          path: "/refresh",
          expires: new Date(Date.now() + 5 * 1000),
        })
        .json({ success: true, token });
    }

    return res
      .status(200)
      .json({ success: false, message: "Invalid credentials" });
  },

  logout: (req, res) => {
    return res
      .clearCookie("refreshToken", { path: "/refresh" })
      .clearCookie("accessToken", { path: "/" })
      .status(200)
      .json({ success: true });
  },

  refresh: (req, res) => {
    if (!req?.cookies?.refreshToken)
      return res
        .status(200)
        .json({ success: false, message: "no refresh token provided" });
    if (
      ({ username } = tokenUtils.validateRefreshToken(req.cookies.refreshToken))
    ) {
      const token = tokenUtils.generateToken({ username }, "1h");
      const refreshToken = tokenUtils.generateRefreshToken({ username }, "1h");
      return res
        .status(200)
        .cookie("accessToken", token, {
          httpOnly: true,
          sameSite: "strict",
          secure: true,
          path: "/",
          expires: new Date(Date.now() + 3 * 1000),
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
          secure: true,
          path: "/refresh",
          expires: new Date(Date.now() + 5 * 1000),
        })
        .json({ success: true, token });
    }

    return res
      .status(200)
      .json({ success: false, message: "refresh token expired" });
  },
};
