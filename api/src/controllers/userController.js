import { Router } from "express";
import userService from "../services/userService.js";

const userController = Router();

userController.post("/api/auth/register", async (req, res) => {
  const { username, email, password, repeatPassword } = req.body;

  try {
    const token = await userService.register(
      username,
      email,
      password,
      repeatPassword
    );

    res.cookie("auth", token);

    res.status(201).json({
      message: "Successful registration",
      token,
      user: { username, email },
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      user: { username, email },
    });
  }
});

userController.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await userService.login(email, password);

    res.cookie("auth", token);

    res.status(201).json({
      message: "Successful login",
      token,
      user: { username, email },
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
      user: { username, password },
    });
  }
});

userController.post("api/auth/logout", async (req, res) => {
  res.clearCookie("auth");
  res.status(201).json({
    message: "Logged out successfuly",
  });
});

export default userController;
