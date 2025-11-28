import { Router } from "express";

import userController from "./controllers/userController.js";
import propertyController from "./controllers/propertyController.js";
import reviewController from "./controllers/reviewController.js";
import bookingController from "./controllers/bookingController.js";

const router = Router();

//endpoints
router.use("/api/auth", userController);
router.use("/api/properties", propertyController);
router.use("/api/reviews", reviewController);
router.use("/api/bookings", bookingController);

export default router;
