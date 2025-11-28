import { Router } from "express";

import userController from "./controllers/userController.js";
import propertyController from "./controllers/propertyController.js";
import reviewController from "./controllers/reviewController.js";

const router = Router();

router("/api/auth", userController);
router("/api/properties", propertyController);
router("/api/reviews", reviewController);

export default router;
