import mongoose, { model, Schema } from "mongoose";


export const classSchema = new Schema({
   classNumber: {type:String, required:true},
   classCategory: {type:String, required:true}
})

export const ClassModel = model('class', classSchema)