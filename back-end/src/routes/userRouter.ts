import { Router } from "express";
import { createUser, signInUser, updateUsername, deleteUser, userStatus } from "../controllers/userController";
import { userDeleteMiddleware, usernameUpdateMiddleware, userSignInMiddleware, userSignUpMiddleware } from "../middlewares/userSchemasMiddlewares";

const userRouter = Router();

userRouter.post("/signup", userSignUpMiddleware, createUser);
userRouter.post("/signin", userSignInMiddleware, signInUser);
userRouter.put("/user", usernameUpdateMiddleware, updateUsername);
userRouter.delete("/user", userDeleteMiddleware, deleteUser);
userRouter.get("/status", userStatus);

export default userRouter;