
import mongoose, { model, Schema, Types } from "mongoose";

export const studentSchema = new Schema({
    firstname: {type: String, required:true},
    surname: {type: String, required:true},
    classes: {type: Types.ObjectId, ref: 'Class', required:true},
    gender: {type: String, required:true, enum:['male', 'female']},
    image: {type: String, required: true}
})


export const StudentModel = model('Student', studentSchema)