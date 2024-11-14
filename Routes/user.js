import { Router } from "express";
import { deleteStudentById, deleteTeacherById, deleteUser, getAllStudents, getAllTeachers, getAllUsers, getStudentById, getTeacherById, getUserById, loginUser, logOut, registerStudent, registerTeacher, registerUser, updateStudentById, updateTeacherById, updateUser, changePassword } from "../Controllers/user.js";
import { studentAvatar, teacherAvatar } from "../Middlewares/upload.js";
import { isAuthenticated } from "../Middlewares/auth.js";

const userRouter = Router()

userRouter.post('/users/register', registerUser)
userRouter.post('/teachers/register', teacherAvatar.single('avatar'), registerTeacher)
userRouter.post('/students/register', studentAvatar.single('avatar'), registerStudent)
userRouter.post('/users/login', loginUser)
userRouter.post('/users/logout', logOut)
userRouter.get('/users', getAllUsers)
userRouter.get('/users/teachers', getAllTeachers)
userRouter.get('/users/students', getAllStudents)
userRouter.get('/users/teachers/:id', getTeacherById)
userRouter.get('/users/students/:id', getStudentById)
userRouter.get('/users/:id', getUserById)
userRouter.patch('/users/:id', updateUser)
userRouter.patch('/users/teachers/:id', teacherAvatar.single('avatar'), updateTeacherById)
userRouter.patch('/users/students/:id', studentAvatar.single('avatar'),updateStudentById)
userRouter.delete('/users/:id', deleteUser)
userRouter.delete('/users/teachers/:id',deleteTeacherById )
userRouter.delete('/users/students/:id',deleteStudentById )
userRouter.post('/users/change-password',isAuthenticated, changePassword)

export default userRouter