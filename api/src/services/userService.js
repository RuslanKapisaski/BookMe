import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../constants/constants.js";
import User from "../models/User.js";
import generateAuthToken from "../utils/tokenUtils.js";

export default {
  async register(username, email, password, repeatPassword) {
    const user = await User.findOne({ email });

    if (user) {
      throw new Error("User with this email already exists!");
    }

    const createdUser = await User.create({
      username,
      email,
      password,
      repeatPassword,
    });

    //generate token
    const token = generateAuthToken(createdUser);
  },
};
