import { Router } from "express";
import { createAnnouncement,deleteAnnouncement,getAllAnnouncements, getAnnouncementById, updateAnnouncement, } from "../Controllers/annoucement.js";
import { isAuthenticated } from "../Middlewares/auth.js";
import { announcementImage } from "../Middlewares/upload.js";

const announcementRouter = Router();

announcementRouter.post('/announcements', isAuthenticated, announcementImage.single('coverImage'), createAnnouncement);
announcementRouter.get('/announcements', isAuthenticated, getAllAnnouncements);
announcementRouter.get('/announcements/:id', isAuthenticated, getAnnouncementById);
announcementRouter.patch('/announcements/:id', isAuthenticated, announcementImage.single('coverImage'), updateAnnouncement);
announcementRouter.delete('/announcements/:id', isAuthenticated, deleteAnnouncement);

export default announcementRouter;
