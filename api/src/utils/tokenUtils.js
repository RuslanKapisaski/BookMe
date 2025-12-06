import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../constants/constants.js";

export default function generateAuthToken(user) {
  const payload = {
    _id: user._id,
    username: user.username,
    email: user.email,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" });

  return token;
}
