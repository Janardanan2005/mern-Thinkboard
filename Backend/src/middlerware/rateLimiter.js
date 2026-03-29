


// import ratelimit from "../config/upstash.js";

// export const rateLimiter = async (req, res, next) => {
//     try {
//         const { success } = await ratelimit.limit("api");
//         if (!success) {
//             return res.status(429).json({ 
//                 message: "Too many requests, please try again later." 
//             });
//         }
//         next();
//     } catch (error) {
//         console.log("Rate limiter error", error);
//         next();
//     }
// };

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