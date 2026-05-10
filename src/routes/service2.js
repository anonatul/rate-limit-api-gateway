import express from 'express';
import rateLimiter from '../middleware/rateLimiter.js';

const router = express.Router();

router.get("/", rateLimiter, (req, res) => {
    res.status(200).json({
        message: "Hello from Service 2"
    });
});

export default router;