const jwt = require("jsonwebtoken");
module.exports = {
  generateToken: (data, expiry = "1h") => {
    return jwt.sign(
      {
        ...data,
      },
      process.env.ACCESS_SECRET_KEY,
      { expiresIn: expiry }
    );
  },
  generateRefreshToken: (data, expiry = "7d") => {
    return jwt.sign(
      {
        ...data,
      },
      process.env.REFRESH_SECRET_KEY,
      { expiresIn: expiry }
    );
  },

  validateRefreshToken: (token) => {
    console.log(token);
    if (jwt.verify(token, process.env.REFRESH_SECRET_KEY)) return true;

    return false;
  },
};
