import bcrypt from "bcrypt";

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

    return { user, token };
  },

  async login(email, password) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid user!");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error("Invalid user!");
    }

    const token = generateAuthToken(user);

    return { user, token };
  },
};
