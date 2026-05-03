import express from 'express';

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        message: "Hello from Service 2"
    });
});

export default router;