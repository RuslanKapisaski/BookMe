import { Router } from "express";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import propertyService from "../services/propertyService.js";
import getErrorMessage from "../utils/errorUtils.js";

const propertyController = Router();

propertyController.get("/latest", async (req, res) => {
  try {
    const latest = await propertyService.getLatest();
    res.status(200).json({
      message: "Latests properties",
      latestProperties: latest,
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    res.status(500).json({ error: errorMessage });
  }
});

propertyController.get("/owner/:ownerId", async (req, res) => {
  try {
    const params = req.params.ownerId;
    const ownerProperties = await propertyService.getAllByOwner(params);
    res.status(200).json({
      message: "Owner Properties",
      properties: ownerProperties,
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    res.status(500).json({
      error: errorMessage,
    });
  }
});

propertyController.get("/", async (req, res) => {
  try {
    const properties = await propertyService.getAll();

    res.status(200).json({
      message: "Properties catalog",
      properties,
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error);

    res.status(500).json({ error: errorMessage });
  }
});

propertyController.get("/:propertyId/details", async (req, res) => {
  try {
    const propertyId = req.params.propertyId;
    const property = await propertyService.getOneById(propertyId);

    if (!property) {
      res.status(404).json({
        message: "Propert not found",
      });
    }

    res.status(200).json({
      message: "Property details data",
      property,
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    res.status(500).json({
      error: errorMessage,
    });
  }
});

propertyController.post("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const porpertyData = { ...req.body, owner: userId };
    const newProperty = await propertyService.create(porpertyData, userId);
    res.status(201).json({
      message: "Successfully created property",
      property: newProperty,
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    res.status(500).json({ error: errorMessage });
  }
});

propertyController.put("/:propertyId", authMiddleware, async (req, res) => {
  try {
    const propertyId = req.params.propertyId;
    const propertyData = req.body;
    const updatedProperty = await propertyService.edit(
      propertyId,
      propertyData
    );

    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json({
      message: "Successfully updated property",
      property: updatedProperty,
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    res.status(500).json({ error: errorMessage });
  }
});

propertyController.delete("/:propertyId", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const propertyId = req.params.propertyId;
    const deletedProperty = await propertyService.remove(userId, propertyId);

    res.status(200).json({
      message: "Successfully deleted property",
      property: deletedProperty,
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    res.status(500).json({ error: errorMessage });
  }
});

export default propertyController;
