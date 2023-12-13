import express from "express";
import getBookings from "../services/bookings/getBookings.js";
import getBookingById from "../services/bookings/getBookingById.js";
import createBooking from "../services/bookings/createBooking.js";
import updateBookingById from "../services/bookings/updateBookingById.js";
import deleteBooking from "../services/bookings/deleteBooking.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const { userId } = req.query;
        const bookings = await getBookings(userId);

        res.json(bookings);
    } catch (error) {
        next(error);
    }
});

router.post("/", authMiddleware, async (req, res, next) => {
    try {
        const { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus } = req.body;
        const newBooking = await createBooking(userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus);

        res.status(201).json(newBooking);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const booking = await getBookingById(id);

        res.status(200).json(booking);
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler);

router.put("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus } = req.body;
        const updatedBooking = await updateBookingById(id, { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus });

        res.status(200).json(updatedBooking);
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler);

router.delete("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedBookingId = await deleteBooking(id);

        res.status(200).json({
            message: `Booking with id ${deletedBookingId} was deleted.`
        });
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler);

export default router;