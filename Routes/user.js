import { Router } from "express";
import { deleteUser, getAllUsers, getUserById, loginUser, logOut, registerTeacher, registerUser, updateUser } from "../Controllers/user.js";

const userRouter = Router()

userRouter.post('/users/register', registerUser)
userRouter.post('/teachers/register', registerTeacher)
userRouter.post('/users/login', loginUser)
userRouter.post('/users/logout', logOut)
userRouter.get('/users', getAllUsers)
userRouter.get('/users/:id', getUserById)
userRouter.patch('/users/:id', updateUser)
userRouter.delete('/users/:id', deleteUser)

export default userRouter