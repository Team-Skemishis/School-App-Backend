import { Router } from "express";
import { isAuthenticated } from "../Middlewares/auth.js";
import { addAttendance, deleteStudentAttendance, getStudentAttendance, updateStudentAttendance } from "../Controllers/attendance.js";

const attendanceRouter = Router()


attendanceRouter.post('/students/attendance', isAuthenticated, addAttendance)
attendanceRouter.get('/students/attendance/:id', isAuthenticated, getStudentAttendance)
attendanceRouter.patch('/students/attendance/:id', isAuthenticated, updateStudentAttendance)
attendanceRouter.delete('/students/attendance/:id', isAuthenticated, deleteStudentAttendance)


export default attendanceRouter