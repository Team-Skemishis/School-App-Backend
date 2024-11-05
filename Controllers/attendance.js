import { attendanceModel } from "../Models/attendance.js";
import { StudentModel } from "../Models/student.js";

export const addAttendance = async (req,res,next) => {
const {value,error} = req.body
const student = await StudentModel.findOne({})
}