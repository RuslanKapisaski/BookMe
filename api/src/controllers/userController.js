import { Router } from "express";

import userService from "../services/userService.js";
import getErrorMessage from "../utils/errorUtils.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import User from "../models/User.js";

const userController = Router();

userController.post("/register", async (req, res) => {
  const { username, email, password, repeatPassword } = req.body;

  try {
    const { user, token } = await userService.register(
      username,
      email,
      password,
      repeatPassword
    );

    res.cookie("auth", token);

    res.status(201).json({
      message: "Successful registration",
      token,
      user: { username: user.username, email: user.email },
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    res.status(400).json({
      error: errorMessage,
      user: { email },
    });
  }
});

userController.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await userService.login(email, password);

    res.cookie("auth", token);

    res.status(200).json({
      message: "Successful login",
      token,
      user: { username: user.username, email: user.email },
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    res.status(401).json({
      error: errorMessage,
      user: { email },
    });
  }
});

userController.post("/logout", async (req, res) => {
  res.clearCookie("auth");
  res.status(201).json({
    message: "Logged out successfuly",
  });
});

userController.get("/profile", authMiddleware, async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId)
      .populate("properties")
      .populate("bookings");

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json({
      message: "User profile data",
      id: user._id,
      username: user.username,
      email: user.email,
      properties: user.properties,
      bookings: user.bookings,
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error);

    res.status(500).json({
      message: "Server error",
      error: errorMessage,
    });
  }
});

export default userController;
