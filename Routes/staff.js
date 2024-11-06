import { Router } from "express";
import { isAuthenticated } from "../Middlewares/auth.js";
import { staffUpload } from "../Middlewares/upload.js";
import { addStaffs, deleteStaffs, getAllStaffs, getStaffById, updateStaffs } from "../Controllers/staff.js";


const staffRouter = Router()

staffRouter.post('/teachers', isAuthenticated, staffUpload.single('image'), addStaffs)
staffRouter.get('/teachers', isAuthenticated, getAllStaffs)
staffRouter.get('/teachers/:id', isAuthenticated, getStaffById)
staffRouter.patch('/teachers/:id', isAuthenticated, staffUpload.single('image'), updateStaffs)
staffRouter.delete('/teachers/:id', isAuthenticated, deleteStaffs)


export default staffRouter