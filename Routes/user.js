import { Router } from "express";
import { loginUser, logOut, registerUser } from "../Controllers/user.js";

const userRouter = Router()

userRouter.post('/users/register', registerUser)
userRouter.post('/users/login', loginUser)
userRouter.post('/users/logout', logOut)

export default userRouter