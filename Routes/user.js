import { Router } from "express";
import { deleteTeacherById, deleteUser, getAllTeachers, getAllUsers, getTeacherById, getUserById, loginUser, logOut, registerTeacher, registerUser, updateTeacherById, updateUser } from "../Controllers/user.js";

const userRouter = Router()

userRouter.post('/users/register', registerUser)
userRouter.post('/teachers/register', registerTeacher)
userRouter.post('/users/login', loginUser)
userRouter.post('/users/logout', logOut)
userRouter.get('/users', getAllUsers)
userRouter.get('/users/teachers', getAllTeachers)
userRouter.get('/users/teachers/:id', getTeacherById)
userRouter.get('/users/:id', getUserById)
userRouter.patch('/users/:id', updateUser)
userRouter.patch('/users/teachers/:id', updateTeacherById)
userRouter.delete('/users/:id', deleteUser)
userRouter.delete('/users/teachers/:id',deleteTeacherById )

export default userRouter