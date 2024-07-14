import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization").replace("Bearer ", "");

    if (!token) {
        return res.status(401).json("Not Authorized: Token not provided");
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SIGNATURE || "mySecretKey");

        if (typeof decoded === "object" && "id" in decoded) {
            req.token = decoded;
            next();
        } else {
            return res.status(401).json("Invalid token format");
        }
    } catch (error) {
        return res.status(401).json("Invalid or expired token");
    }
};
