import jwt from "jsonwebtoken";

export const generateToken = (data, expiry = "1h") => {
  return jwt.sign(
    {
      ...data,
    },
    process.env.ACCESS_SECRET_KEY,
    { expiresIn: expiry }
  );
}

export const generateRefreshToken = (data, expiry = "7d") => {
  return jwt.sign(
    {
      ...data,
    },
    process.env.REFRESH_SECRET_KEY,
    { expiresIn: expiry }
  );
}

export const validateRefreshToken = (token) => {
  if (jwt.verify(token, process.env.REFRESH_SECRET_KEY)) return true;
  return false;
}
