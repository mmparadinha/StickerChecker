import { Router } from "express";
import { createUser, signInUser, updateUsername, deleteUser, userStats } from "../controllers/userController.js";
import { userDeleteMiddleware, usernameUpdateMiddleware, userSignInMiddleware, userSignUpMiddleware } from "../middlewares/userSchemasMiddlewares.js";

const userRouter = Router();

userRouter.post("/signup", userSignUpMiddleware, createUser);
userRouter.post("/signin", userSignInMiddleware, signInUser);
userRouter.put("/user", usernameUpdateMiddleware, updateUsername);
userRouter.delete("/user", userDeleteMiddleware, deleteUser);
userRouter.get("/user", userStats);

export default userRouter;