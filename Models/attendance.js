
import mongoose, { model, Schema, Types } from "mongoose";

const attendanceSchema = new Schema({
    studentID:{ type: Types.ObjectId, ref: 'Student', required:true }, 
    date:{ type:Date, required:true, default: Date.now},
    status: {type: String, enum:['present', 'absent']}
})

export const attendanceModel = model('Attendance', attendanceSchema)