import { Router } from "express";

import userController from "./controllers/userController.js";
import propertyController from "./controllers/propertyController.js";
import reviewController from "./controllers/reviewController.js";
import bookingController from "./controllers/bookingController.js";

const router = Router();

//endpoints
router("/api/auth", userController);
router("/api/properties", propertyController);
router("/api/reviews", reviewController);
router("/api/bookings", bookingController);

export default router;
