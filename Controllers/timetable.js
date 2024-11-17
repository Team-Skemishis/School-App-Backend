import { TimetableModel } from "../Models/timetable.js";
import { addTimetableValidator } from "../Validators/timetable.js";

// Add a timetable entry
export const createTimetableEntry = async (req, res, next) => {
    try {
        // Validate request body
        const { error } = addTimetableValidator.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        // Create and save timetable entry
        const timetableEntry = await TimetableModel.create(req.body);
        res.status(201).json(timetableEntry);
    } catch (error) {
        next(error);
    }
};

export const getAllTimetable = async (req, res, next) => {
    const {filter = "{}", sort = "{}", limit = 100, skip = 0} = req.query;
    const timetable = await TimetableModel
    .find(JSON.parse(filter))
    .sort(JSON.parse(sort))
    .limit(limit)
    .skip(skip)
    res.status(200).json(timetable)
}

export const getTimetableById = async (req, res, next) => {
    try {
        const timetable = await TimetableModel.findById(req.params.id)
        res.status(201).json(timetable)
    } catch (error) {
        next(error)
    }
}


// Update a timetable entry
export const updateTimetableEntry = async (req, res, next) => {
    try {
        const { error } = addTimetableValidator.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const timetableEntry = await TimetableModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!timetableEntry) return res.status(404).json({ message: "Timetable entry not found" });

        res.status(200).json(timetableEntry);
    } catch (error) {
        next(error);
    }
};

// Delete a timetable entry
export const deleteTimetableEntry = async (req, res, next) => {
    try {
      
        const timetableEntry = await TimetableModel.findByIdAndDelete(req.params.id);
        if (!timetableEntry) return res.status(404).json({ message: "Timetable entry not found" });

        res.status(200).json({ message: "Timetable entry deleted successfully" });
    } catch (error) {
        next(error);
    }
};
