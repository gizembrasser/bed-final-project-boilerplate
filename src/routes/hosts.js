import express from "express";
import getHosts from "../services/hosts/getHosts.js";
import getHostById from "../services/hosts/getHostById.js";
import createHost from "../services/hosts/createHost.js";
import updateHostById from "../services/hosts/updateHostById.js";
import deleteHost from "../services/hosts/deleteHost.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// GET route for fetching all hosts.
router.get("/", async (req, res, next) => {
    try {
        const { name } = req.query;
        const hosts = await getHosts(name);

        res.json(hosts);
    } catch (error) {
        next(error);
    }
});

// POST route for creating a new host.
router.post("/", authMiddleware, async (req, res, next) => {
    try {
        const { username, password, name, email, phoneNumber, profilePicture, aboutMe } = req.body;
        const newHost = await createHost(username, password, name, email, phoneNumber, profilePicture, aboutMe);

        res.status(201).json(newHost);
    } catch (error) {
        next(error);
    }
});

// GET route for fetching a single host by ID.
router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const host = await getHostById(id);

        res.status(200).json(host);
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler);

// PUT route for updating a host by ID.
router.put("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { username, password, name, email, phoneNumber, profilePicture, aboutMe } = req.body;
        const updatedHost = await updateHostById(id, { username, password, name, email, phoneNumber, profilePicture, aboutMe });

        res.status(200).json(updatedHost);
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler);

// DELETE route for deleting a host by ID.
router.delete("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedHostId = await deleteHost(id);

        res.status(200).json({
            message: `Host with id ${deletedHostId} was deleted.`
        });
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler);

export default router;