import { Router } from "express";
import { createUser, signInUser, updateUsername, deleteUser, userStatus } from "../controllers/userController";
import { userDeleteMiddleware, usernameUpdateMiddleware, userSignInMiddleware, userSignUpMiddleware } from "../middlewares/userSchemasMiddlewares";
import { authenticateToken } from "../middlewares/authenticationMiddleware";

const userRouter = Router();

userRouter
    .post("/signup", userSignUpMiddleware, createUser)
    .post("/signin", userSignInMiddleware, signInUser)

    .all('/*', authenticateToken)
    .put("/user", usernameUpdateMiddleware, updateUsername)
    .delete("/user", userDeleteMiddleware, deleteUser)
    .get("/status", userStatus);

export default userRouter;