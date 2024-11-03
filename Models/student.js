import mongoose, { model, Schema } from "mongoose";

export const studentSchema = new Schema({
    firstname: {type: String, required:true},
    surname: {type: String, required:true},
    class: {type: String, required:true},
    gender: {type: String, required:true, enum:['male', 'female']},
    image: {type: String, required: true}
})


export const StudentModel = model('student', studentSchema)