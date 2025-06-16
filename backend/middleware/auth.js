import jwt from "jsonwebtoken"

export const authMiddleware = async (req, res, next) => {

    const token = await req.headers.authorization.split("")[1]
    if (!token) {
        res.json({
            message: "user is not authenticated"
        })
    }
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({
            message: "Invalid Token"
        })
    }
}