
import mongoose, { model, Schema, Types } from "mongoose";


export const userSchema = new Schema({
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    // telephone:{type: Number, required: true},
    email:{type: String, required: true, unique:true},
    password:{type:String, required:true},
    avatar:{type:String},
    schoolName:{type:String},
    redirectURL: {type: String},
    classes:{type: Types.ObjectId, ref:'class'},
    gender: {type: String, enum:['male', 'female']},
    role:{type: String, default: 'admin', enum:['student', 'teacher', 'admin']}

})



export const UserModel = model('user', userSchema)