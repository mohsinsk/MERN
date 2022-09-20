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
};
