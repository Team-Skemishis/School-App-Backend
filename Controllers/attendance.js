import { attendanceModel } from "../Models/attendance.js";
import { ClassModel } from "../Models/class.js";
import { StudentModel } from "../Models/student.js";

export const addAttendance = async (req,res,next) => {
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


    const attendance = await attendanceModel.create({ studentID: student._id, classID:classes._id, date, status})
    res.status(201).json(attendance)
    
} catch (error) {
    next(error)
}
}