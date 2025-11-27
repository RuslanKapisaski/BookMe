import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants/constants";
import getErrorMessage from "../utils/errorUtils";

export function authMiddleware(req, res, next) {
  const token = req.header("X-Authorization");

  if (!token) {
    return next();
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    res.status(401).json({
      message: errorMessage,
    });
  }
}
