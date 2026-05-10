import redis from "../redis/client.js";

const CAPACITY = 10;
const REFILL_RATE = 1;

const rateLimiter = async (req, res, next) => {
    const ip = req.ip;
    const key = `rate-limit:${ip}`;
    const now = Math.floor(Date.now() / 1000);

    let bucket;

    const data = await redis.get(key);

    if (!data) {
        bucket = {
            tokens: CAPACITY,
            lastRefill: now
        }
    } else {
        bucket = JSON.parse(data);
    };

    const elapsed = now - bucket.lastRefill;
    const refill = elapsed * REFILL_RATE;

    bucket = {
        tokens: Math.min(CAPACITY, bucket.tokens + refill),
        lastRefill: now
    }

    if (bucket.tokens < 1) {
        res.status(429).json({
            message: "Too many requests!"
        });
        await redis.set(key, JSON.stringify(bucket));
        return;
    } else {
        bucket.tokens -= 1;
        await redis.set(key, JSON.stringify(bucket));
        next();
    }
};

export default rateLimiter;