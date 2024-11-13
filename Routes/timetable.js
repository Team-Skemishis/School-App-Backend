import { Router } from "express";
import { createTimetableEntry, updateTimetableEntry, deleteTimetableEntry, getAllTimetable } from "../Controllers/timetable.js";
import { isAuthenticated } from "../Middlewares/auth.js";

const timetableRouter = Router();

timetableRouter.post('/timetable', isAuthenticated, createTimetableEntry);
timetableRouter.get('/timetable', isAuthenticated, getAllTimetable);
timetableRouter.patch('/timetable/:id', isAuthenticated, updateTimetableEntry);
timetableRouter.delete('/timetable/:id', isAuthenticated, deleteTimetableEntry);

export default timetableRouter;
