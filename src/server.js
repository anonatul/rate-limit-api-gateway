import express from 'express';
import redis from './redis/client.js';
import { configDotenv } from 'dotenv';
import service1 from './routes/service1.js';
import service2 from './routes/service2.js';

configDotenv();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/s1", service1);
app.use("/s2", service2);

// testing the redis infra 
app.get("/test", async (req, res) => {
    await redis.set("name", "Atul");

    const value = await redis.get("name");

    res.status(200).json({ value });
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});