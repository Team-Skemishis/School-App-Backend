import { Router } from "express";
import { createTimetableEntry, updateTimetableEntry, deleteTimetableEntry, getAllTimetable, getTimetableById } from "../Controllers/timetable.js";
import { isAuthenticated } from "../Middlewares/auth.js";

const timetableRouter = Router();

timetableRouter.post('/timetable', isAuthenticated, createTimetableEntry);
timetableRouter.get('/timetable', isAuthenticated, getAllTimetable);
timetableRouter.get('/timetable/:id', isAuthenticated, getTimetableById);
timetableRouter.patch('/timetable/:id', isAuthenticated, updateTimetableEntry);
timetableRouter.delete('/timetable/:id', isAuthenticated, deleteTimetableEntry);

export default timetableRouter;
