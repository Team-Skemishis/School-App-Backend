import { Router } from "express";
import { isAuthenticated } from "../Middlewares/auth.js";
import { addAttendance } from "../Controllers/attendance.js";

const attendanceRouter = Router()


attendanceRouter.post('/attendance', isAuthenticated, addAttendance)


export default attendanceRouter