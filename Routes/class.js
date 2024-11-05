import { Router } from "express";
import { isAuthenticated } from "../Middlewares/auth.js";
import { addClass, deleteClass, getAllClass, getClassById, updateClass } from "../Controllers/class.js";


const classRouter = Router()

classRouter.post('/class', isAuthenticated, addClass)
classRouter.get('/class', isAuthenticated, getAllClass)
classRouter.get('/class/:id', isAuthenticated, getClassById)
classRouter.patch('/class/:id', isAuthenticated, updateClass)
classRouter.delete('/class/:id', isAuthenticated, deleteClass)



export default classRouter