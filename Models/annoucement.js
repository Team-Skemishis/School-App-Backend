import mongoose, { model, Schema } from "mongoose";

const announcementSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    userType: { type: String, enum: ['all', 'teachers', 'students'], required: true }, // target audience
    createdBy: { type: mongoose.Types.ObjectId, ref: 'User', required: true }, // Admin who created
    createdAt: { type: Date, default: Date.now },
    coverImage:{type: String}
},{
    timestamps: true
});

export const AnnouncementModel = model('Announcement', announcementSchema);
