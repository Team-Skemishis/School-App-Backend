
import mongoose, { model, Schema, Types } from "mongoose";


export const classSchema = new Schema({
   classNumber: {type:String, required:true},
   classCategory: {type:String, required:true},
   classTeacher: {type: Types.ObjectId, ref:'user', required:true}
})

export const ClassModel = model('class', classSchema)