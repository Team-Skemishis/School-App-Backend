import { Router } from "express";
import { addStudent, deleteStudent, getAllStudents, getStudentById, updateStudent } from "../Controllers/student.js";
import { isAuthenticated } from "../Middlewares/auth.js";
import { studentUpload } from "../Middlewares/upload.js";


const studentRouter = Router()

studentRouter.post('/students', isAuthenticated, studentUpload.single('image'), addStudent)
studentRouter.get('/students', isAuthenticated, getAllStudents)
studentRouter.get('/students/:id', isAuthenticated, getStudentById)
studentRouter.patch('/students/:id', isAuthenticated, studentUpload.single('image'), updateStudent)
studentRouter.delete('/students/:id', isAuthenticated, deleteStudent)


export default studentRouter