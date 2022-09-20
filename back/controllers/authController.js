const tokenUtils = require("../utils");

module.exports = {
  login: (req, res) => {
    const { username, password } = req.body;

    if (username === "1mohsin.sk@gmail.com" && password === "mohsin") {
      const token = tokenUtils.generateToken({ username }, "1h");
      const refreshToken = tokenUtils.generateToken({ username }, "1h");
      return res
        .status(200)
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
          path: "/",
          expires: new Date(Date.now() + 100 * 1000),
        })
        .json({ success: true, accessToken: token });
    }

    return res
      .status(200)
      .json({ success: false, message: "Invalid credentials" });
  },
};
