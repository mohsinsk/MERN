import { generateRefreshToken, generateToken, validateRefreshToken } from "../utils/index.js";
import UserModel from '../models/userModel.js'

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    const token = generateToken({ email }, "15m");
    const refreshToken = generateRefreshToken({ email }, "7d");
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
}

export const logout = (req, res) => {
  return res
    .clearCookie("refreshToken", { path: "/refresh" })
    .clearCookie("accessToken", { path: "/" })
    .status(200)
    .json({ success: true });
}

export const refresh = (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(400).json({ success: false, message: "No refresh token provided" });
  }

  try {
    const payload = validateRefreshToken(refreshToken);
    if (!payload) {
      return res.status(401).json({ success: false, message: "Invalid refresh token" });
    }

    const { email } = payload;
    const token = generateToken({ email }, "15m");
    const newRefreshToken = generateRefreshToken({ email }, "7d");

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
}

export const register = async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body);
    console.log(newUser)
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
