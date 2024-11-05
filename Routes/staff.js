import { Router } from "express";
import { isAuthenticated } from "../Middlewares/auth.js";
import { staffUpload } from "../Middlewares/upload.js";
import { addStaffs, deleteStaffs, getAllStaffs, getStaffById, updateStaffs } from "../Controllers/staff.js";


const staffRouter = Router()

staffRouter.post('/staffs', isAuthenticated, staffUpload.single('image'), addStaffs)
staffRouter.get('/staffs', isAuthenticated, getAllStaffs)
staffRouter.get('/staffs/:id', isAuthenticated, getStaffById)
staffRouter.patch('/staffs/:id', isAuthenticated, staffUpload.single('image'), updateStaffs)
staffRouter.delete('/staffs/:id', isAuthenticated, deleteStaffs)


export default staffRouter