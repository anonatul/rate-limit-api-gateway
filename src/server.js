import express from 'express';
import { configDotenv } from 'dotenv';
import service1 from './routes/service1.js';
import service2 from './routes/service2.js';

configDotenv();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/s1", service1);
app.use("/s2", service2);

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});