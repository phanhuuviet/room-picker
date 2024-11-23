import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const validateJWT = async (req, res, next) => {
    const authHeader = req.headers["authorization"]; // Lấy header Authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Unauthorized: Invalid or missing token",
        });
    }
    const token = authHeader.split(" ")[1];

    try {
        // Verify token
        const secretKey = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secretKey);
        const user = await User.findById(decoded.id);
        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
};
