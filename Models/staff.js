import mongoose, { model, Schema } from "mongoose";


export const staffSchema = new Schema({
    firstname: {type: String, required:true},
    surname: {type: String, required:true},
    email: {type: String, required:true, unique: true},
    gender: {type: String, required:true, enum:['male', 'female']},
    image: {type: String, required: true}
})

export const StaffModel = model('staff', staffSchema)