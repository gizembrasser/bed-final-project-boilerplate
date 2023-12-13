import jwt from "jsonwebtoken";

// Checks the user's JWT, including secret key, generated by updatedLogin.js.
// This function is used on POST, PUT and DELETE routes.
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";

    if (!token) {
        return res.status(401).json({ message: "You cannot access this operation without a token!" });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token provided!" });
        }

        req.user = decoded;
        next();
    });
};

export default authMiddleware;