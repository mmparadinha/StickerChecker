import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import stickersRouter from './routes/stickersRouter';
import userRouter from './routes/userRouter';

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());

server.use(userRouter);
server.use(stickersRouter);

server.listen(process.env.BACKEND_PORT, () => {
    console.log(`Listening at ${process.env.BACKEND_PORT}!`);
});

export default server;