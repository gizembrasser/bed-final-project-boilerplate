import { Router } from "express";
import generateJwt from "../services/auth/generateJwt.js";

const router = Router();

// POST route for logging in users. Extracts username and password from the request body.
// Returns a token if login is successful.
router.post("/", async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const token = await generateJwt(username, password);

        if (!token) {
            res.status(401).json({ message: "Invalid credentials!" });
        } else {
            res.status(200).json({ message: "Succesfully logged in!", token });
        }
    } catch (error) {
        next(error);
    }
});

export default router;