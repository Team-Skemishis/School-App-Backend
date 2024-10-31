import { Router } from "express";
import { isAuthenticated } from "../Middlewares/auth.js";
import { addAssignment, deleteAssignment, getAllAssignments, getAssignmentById, updateAssignment } from "../Controllers/teacher.js";

const assignmentRouter = Router();

assignmentRouter.post('/assignments', isAuthenticated, addAssignment)
assignmentRouter.get('/assignments', isAuthenticated, getAllAssignments)
assignmentRouter.get('/assignments/:id', isAuthenticated, getAssignmentById)
assignmentRouter.patch('/assignments/:id', isAuthenticated, updateAssignment)
assignmentRouter.delete('/assignments/:id', isAuthenticated, deleteAssignment)

export default assignmentRouter