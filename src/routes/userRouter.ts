import { Router } from "express";
import { createUser, signInUser, updateUsername, deleteUser, userStats } from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/user/signup", createUser);
userRouter.post("/user/signin", signInUser);
userRouter.put("/user", updateUsername);
userRouter.delete("/user", deleteUser);
userRouter.get("/user", userStats);

export default userRouter;