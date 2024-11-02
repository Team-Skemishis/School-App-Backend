import { Router } from "express";
import { isAuthenticated } from "../Middlewares/auth.js";
import { addAssignment, deleteAssignment, getAllAssignments, getAssignmentById, updateAssignment } from "../Controllers/teacher.js";
import { assignmentFile } from "../Middlewares/upload.js";

const assignmentRouter = Router();

assignmentRouter.post('/assignments', isAuthenticated, assignmentFile.single('file'),addAssignment)
assignmentRouter.get('/assignments', isAuthenticated, getAllAssignments)
assignmentRouter.get('/assignments/:id', isAuthenticated, getAssignmentById)
assignmentRouter.patch('/assignments/:id', isAuthenticated,assignmentFile.single('file'), updateAssignment)
assignmentRouter.delete('/assignments/:id', isAuthenticated, deleteAssignment)

export default assignmentRouter