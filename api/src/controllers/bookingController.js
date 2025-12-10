import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

import getErrorMessage from "../utils/errorUtils.js";
import bookingService from "../services/bookingService.js";

const bookingController = Router();

bookingController.get("/latest", async (req, res) => {
  try {
    const latest = await bookingService.getLatest();
    res.status(200).json({
      message: "Latest bookings",
      bookings: latest,
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    res.status(500).json({ error: errorMessage });
  }
});

bookingController.get("/me", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const userBookings = await bookingService.getAllByUser(userId);

    if (!userBookings || userBookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user" });
    }

    res.status(200).json({
      message: "User bookings",
      bookings: userBookings,
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    res.status(500).json({
      error: errorMessage,
    });
  }
});

bookingController.get("/", async (req, res) => {
  try {
    const bookings = await bookingService.getAll();
    res.status(200).json({
      message: "Bookings",
      bookings,
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error);

    res.status(500).json({ error: errorMessage });
  }
});

bookingController.get("/:bookingId/details", async (req, res) => {
  try {
    const userId = req.params.userId;
    const booking = await bookingService.getById(userId);

    if (!booking) {
      res.status(404).json({
        message: "Booking not found",
      });
    }

    res.status(200).json({
      message: "Booking details",
      booking,
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    res.status(500).json({
      error: errorMessage,
    });
  }
});

bookingController.post("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const bookingData = { ...req.body, guest: userId };
    const newBooking = await bookingService.create(bookingData);

    res.status(201).json({
      message: "Successfully created booking",
      booking: newBooking,
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    res.status(500).json({ error: errorMessage });
  }
});

bookingController.put("/:bookingId", authMiddleware, async (req, res) => {
  try {
    const bookingId = req.params.reviewId;
    const bookingData = req.body;
    const updatedBooking = await bookingService.edit(bookingId, bookingData);

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      message: "Successfully updated booking",
      booking: updatedBooking,
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    res.status(500).json({ error: errorMessage });
  }
});

bookingController.patch("/:bookingId", authMiddleware, async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const updates = req.body;
    const updatedBooking = await bookingService.edit(bookingId, updates);

    if (!updatedBooking) {
      res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      message: "Booking updated successfuly",
      booking: updatedBooking,
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    res.status(500).json({ error: errorMessage });
  }
});

bookingController.delete("/:bookingId", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const bookingId = req.params.propertyId;
    const deletedBooking = await bookingService.remove(userId, bookingId);

    res.status(200).json({
      message: "Successfully deleted booking",
      booking: deletedBooking,
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    res.status(500).json({ error: errorMessage });
  }
});
export default bookingController;
