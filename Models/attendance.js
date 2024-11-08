
import mongoose, { model, Schema, Types } from "mongoose";

const attendanceSchema = new Schema({
    studentID:{ type: Types.ObjectId, ref: 'user', required:true }, 
    classID:{ type: Types.ObjectId, ref: 'class', required:true }, 
    date:{ type:Date,  default: Date.now},
    status: {type: String, enum:['present', 'absent']}
})

export const attendanceModel = model('Attendance', attendanceSchema)