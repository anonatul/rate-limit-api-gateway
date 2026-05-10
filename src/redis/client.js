import Redis from "ioredis";

const redis = new Redis({
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD,
    db: 0
});

redis.on("connect", () => {
    console.log("Redis Connected");
});

redis.on("error", (err) => {
    console.log("Redis error: ", err);
});

redis.on("close", () => {
    console.log("Redis connection closed.");
});

redis.on("reconnecting", () => {
    console.log("Reconnecting to redis...");
});

export default redis;