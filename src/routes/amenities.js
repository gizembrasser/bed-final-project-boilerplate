import express from "express";
import getAmenities from "../services/amenities/getAmenities.js";
import getAmenityById from "../services/amenities/getAmenityById.js";
import createAmenity from "../services/amenities/createAmenity.js";
import updateAmenityById from "../services/amenities/updateAmenityById.js";
import deleteAmenity from "../services/amenities/deleteAmenity.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// GET route for fetching all amenities.
router.get("/", async (req, res, next) => {
    try {
        const amenities = await getAmenities();
        res.json(amenities);
    } catch (error) {
        next(error);
    }
});

// POST route for creating a new amenity.
router.post("/", authMiddleware, async (req, res, next) => {
    try {
        const { name } = req.body;
        const newAmenity = await createAmenity(name);

        res.status(201).json(newAmenity);
    } catch (error) {
        next(error);
    }
});

// GET route for fetching a single amenity by ID.
router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const amenity = await getAmenityById(id);

        res.status(200).json(amenity);
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler);

// PUT route for updating an amenity by ID.
router.put("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updatedAmenity = await updateAmenityById(id, { name });

        res.status(200).json(updatedAmenity);
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler);

// DELETE route for deleting an amenity by ID.
router.delete("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedAmenityId = await deleteAmenity(id);

        res.status(200).json({
            message: `Amenity with id ${deletedAmenityId} was deleted.`
        });
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler);

export default router;