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
          expires: new Date(Date.now() + 10 * 1000),
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
          secure: true,
          path: "/refresh",
          expires: new Date(Date.now() + 12 * 1000),
        })
        .json({ success: true, token });
    }

    return res
      .status(200)
      .json({ success: false, message: "Invalid credentials" });
  },

  refresh: (req, res) => {
    if (!req?.cookies?.refreshToken)
      return res.json({ success: false, message: "no refresh token provided" });
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
          expires: new Date(Date.now() + 10 * 1000),
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
          secure: true,
          path: "/refresh",
          expires: new Date(Date.now() + 12 * 1000),
        })
        .json({ success: true, token });
    }

    return res
      .status(400)
      .json({ success: false, message: "refresh token expired" });
  },
};
