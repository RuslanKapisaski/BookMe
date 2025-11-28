import { Router } from "express";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import reviewService from "../services/reviewService.js";
import getErrorMessage from "../utils/errorUtils.js";

const reviewController = Router();

reviewController.get("/latest", async (req, res) => {
  try {
    const latest = await reviewService.getLatest();
    res.status(200).json({
      message: "Latests reviews",
      lastestReviews: latest,
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    res.status(500).json({ error: errorMessage });
  }
});

reviewController.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.ownerId;
    const userReviews = await reviewService.getAllByUser(userId);
    res.status(200).json({
      message: "User Reviews",
      reviews: userReviews,
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    res.status(500).json({
      error: errorMessage,
    });
  }
});

reviewController.get("/", async (req, res) => {
  try {
    const reviews = await reviewService.getAll();
    res.status(200).json({
      message: "Reviews",
      reviews,
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error);

    res.status(500).json({ error: errorMessage });
  }
});

reviewController.get("/:userId/details", async (req, res) => {
  try {
    const userId = req.params.userId;
    const review = await reviewService.getById(userId);

    if (!review) {
      res.status(404).json({
        message: "Review not found",
      });
    }

    res.status(200).json({
      message: "Review details",
      review,
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    res.status(500).json({
      error: errorMessage,
    });
  }
});

reviewController.post("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const reviewData = { ...req.body, user: userId };
    const newReview = await reviewService.create(reviewData, userId);
    res.status(201).json({
      message: "Successfully created review",
      review: newReview,
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    res.status(500).json({ error: errorMessage });
  }
});

reviewController.put("/:reviewId", authMiddleware, async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const reviewData = req.body;
    const updatedReview = await reviewService.edit(reviewId, reviewData);

    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({
      message: "Successfully updated review",
      review: updatedReview,
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    res.status(500).json({ error: errorMessage });
  }
});

reviewController.delete("/:reviewId", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const reviewId = req.params.propertyId;
    const deletedReview = await reviewService.remove(userId, reviewId);

    res.status(200).json({
      message: "Successfully deleted review",
      review: deletedReview,
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    res.status(500).json({ error: errorMessage });
  }
});

export default reviewController;
