import express from "express";
import getProperties from "../services/properties/getProperties.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import createProperty from "../services/properties/createProperty.js";
import updatePropertyById from "../services/properties/updatePropertyById.js";
import deleteProperty from "../services/properties/deleteProperty.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// GET route for fetching all properties.
router.get("/", async (req, res, next) => {
    try {
        const { location, pricePerNight } = req.query;
        const properties = await getProperties(location, pricePerNight);

        res.json(properties);
    } catch (error) {
        next(error);
    }
});

// POST route for creating a new property.
router.post("/", authMiddleware, async (req, res, next) => {
    try {
        const { title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, rating, hostId, amenities } = req.body;
        const newProperty = await createProperty(title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, rating, hostId, amenities);

        res.status(201).json(newProperty);
    } catch (error) {
        next(error);
    }
});

// GET route for fetching a single property by ID.
router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const property = await getPropertyById(id);

        res.status(200).json(property);
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler);

// PUT route for updating an property by ID.
router.put("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, rating, hostId, amenities } = req.body;
        const updatedProperty = await updatePropertyById(id, { title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, rating, hostId, amenities });

        res.status(200).json(updatedProperty);
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler);

// DELETE route for deleting an property by ID.
router.delete("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedPropertyId = await deleteProperty(id);

        res.status(200).json({
            message: `Property with id ${deletedPropertyId} was deleted.`
        });
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler);

export default router;