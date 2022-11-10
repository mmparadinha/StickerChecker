import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import stickersRouter from './routes/stickersRouter.js';
import userRouter from './routes/userRouter.js';

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());

server.use(stickersRouter);
server.use(userRouter);

server.listen(process.env.BACKEND_PORT, () => {
    console.log(`Listening at ${process.env.BACKEND_PORT}!`);
});