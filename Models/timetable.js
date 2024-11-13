
import { model, Schema, Types } from "mongoose";

export const timetableSchema = new Schema({
    classes: {type: Types.ObjectId, ref: 'class', required: true},
    teacher: {type: Types.ObjectId, ref: 'user', required: true},
    day:{type:String, enum:['monday','tuesday', 'wednesday', 'thursday', 'friday'], required: true}, 
    startTime:{type: String, required: true},
    endTime:{type: String, required: true},
    subject:{type:String}
})


export const TimetableModel = model('timetable', timetableSchema)