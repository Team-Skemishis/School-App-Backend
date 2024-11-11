import { attendanceModel } from "../Models/attendance.js";
import { ClassModel } from "../Models/class.js";
import { StudentModel } from "../Models/student.js";
import { UserModel } from "../Models/user.js";

export const addAttendance = async (req,res,next) => {
try {
    const {firstname,surname, date, status, classID} = req.body
    if (!firstname || !surname){
        return res.status(400).json({
            message: "Both first name and surname are required"
        })
    }
    const student = await UserModel.findOne({firstname, surname})
    if (!student) {
        return res.status(404).json('student not found')
    }
    const classes = await ClassModel.findOne({classNumber: classID})
    if(!classes){
        return res.status(404).json('class not found')
    }


    const attendance = await attendanceModel.create({ studentID: student._id, classID:classes._id, date, status})
    res.status(201).json(attendance)
    
} catch (error) {
    next(error)
}
}

export const getStudentAttendance = async (req, res, next) => {
    try {
        const { filter = "{}", sort = "{}", limit = 100, skip = 0 } = req.query;
        const studentAttendance = await attendanceModel
            .find(JSON.parse(filter))
            .sort(JSON.parse(sort))
            .limit(limit)
            .skip(skip)
        res.status(200).json(studentAttendance)
    } catch (error) {
        next(error)
    }
}
export const updateStudentAttendance = async (req, res, next) => {
    try {
        const {firstname,surname, date, status, classID} = req.body
        if (!firstname || !surname){
            return res.status(400).json({
                message: "Both first name and surname are required"
            })
        }
        const student = await StudentModel.findOne({firstname, surname})
        if (!student) {
            return res.status(404).json(error)
        }
        const classes = await ClassModel.findOne({classNumber: classID})
        if(!classes){
            return res.status(404).json('class not found')
        }
    
        const studentAttendance = await attendanceModel.findByIdAndUpdate(req.params.id, {  studentID: student._id, classID:classes._id, date, status}, { new: true })
        res.status(200).json(studentAttendance)
    } catch (error) {
        next(error)
    }
}

export const deleteStudentAttendance = async (req,res,next) => {
    try {
        await attendanceModel.findByIdAndDelete(req.params.id)
        res.status(200).json('Attendance deleted successfully')
    } catch (error) {
        next(error)
    }
    }