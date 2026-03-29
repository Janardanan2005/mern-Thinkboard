
import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
    windowMs: 10* 1000, // 10 seconds
    max: 10, // max 5 requests per 10 seconds
    message: {
        message: "Too many requests, please try again later."
    },
    standardHeaders: true,
    legacyHeaders: false,
});