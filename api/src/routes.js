import { Router } from "express";

import userController from "./controllers/userController.js";
import propertyController from "./controllers/propertyController.js";

const router = Router();

router("/api/auth", userController);
router("/api/properties", propertyController);

export default router;
