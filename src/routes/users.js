import express from "express";
import getUsers from "../services/users/getUsers.js";
import getUserById from "../services/users/getUserById.js";
import createUser from "../services/users/createUser.js";
import updateUserById from "../services/users/updateUserById.js";
import deleteUser from "../services/users/deleteUser.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// GET route for fetching all users.

// POST route for creating a new user.
router.post("/", authMiddleware, async (req, res, next) => {
    try {
        const { username, password, name, email, phoneNumber, profilePicture } = req.body;
        const newUser = await createUser(username, password, name, email, phoneNumber, profilePicture);

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
});

export default router;
