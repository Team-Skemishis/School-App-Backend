
import mongoose, { Schema, Types, model } from "mongoose";

export const assignmentSchema = new Schema({
    title:{type: String, required: true},
    questions: {type:String, required: true},
    deadline: {type:Date, required: true},
    file:{type: String},
    user:{type: Types.ObjectId, required: true, ref:'user'}
})

export const AssignmentModel = model('teacher', assignmentSchema)