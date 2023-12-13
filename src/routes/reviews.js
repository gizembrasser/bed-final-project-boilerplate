import express from "express";
import getReviews from "../services/reviews/getReviews.js";
import getReviewById from "../services/reviews/getReviewById.js";
import createReview from "../services/reviews/createReview.js";
import updateReviewById from "../services/reviews/updateReviewById.js";
import deleteReview from "../services/reviews/deleteReview.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const reviews = await getReviews();
        res.json(reviews);
    } catch (error) {
        next(error);
    }
});

router.post("/", authMiddleware, async (req, res, next) => {
    try {
        const { userId, propertyId, rating, comment } = req.body;
        const newReview = await createReview(userId, propertyId, rating, comment);

        res.status(201).json(newReview);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const review = await getReviewById(id);

        res.status(200).json(review);
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler);

router.put("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId, propertyId, rating, comment } = req.body;
        const updatedReview = await updateReviewById(id, { userId, propertyId, rating, comment });

        res.status(200).json(updatedReview);
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler);

router.delete("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedReviewId = await deleteReview(id);

        res.status(200).json({
            message: `Review with id ${deletedReviewId} was deleted.`
        });
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler);

export default router;