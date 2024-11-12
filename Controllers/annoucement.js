import { AnnouncementModel } from "../Models/annoucement.js";
import { addAnnouncementValidator, updateAnnoucementValidator } from "../Validators/annoucement.js";

// Create an announcement
export const createAnnouncement = async (req, res, next) => {
    try {
        const { title, content, userType } = req.body;

        // Validate request body
        const { error, value } = addAnnouncementValidator.validate({...req.body, coverImage:req.file?.filename});
        if (error) return res.status(400).json({ message: error.details[0].message });

        // // Only admins should create announcements
        // if (req.auth.role !== 'admin') {
        //     return res.status(403).json({ message: "Unauthorized" });
        // }
        // Create and save announcement
        const announcement = await AnnouncementModel.create({
            ...value,
            createdBy: req.auth.id,
            coverImage: req.file?.filename
        });

        res.status(201).json(announcement);
    } catch (error) {
        next(error);
    }
};

// Get all announcements
export const getAllAnnouncements = async (req, res, next) => {
    try {
        const { filter = "{}", sort = "{}", limit = 100, skip = 0 } = req.query;
        const announcements = await AnnouncementModel
            .find(JSON.parse(filter))
            .sort(JSON.parse(sort))
            .limit(limit)
            .skip(skip)

        res.status(200).json(announcements);
    } catch (error) {
        next(error);
    }
};

export const getAnnouncementById = async (req, res, next) => {
    try {
        const announcement = await AnnouncementModel.findById(req.params.id)
        res.status(201).json(announcement)
    } catch (error) {
        next(error)   
    }
    }

// Update an announcement
export const updateAnnouncement = async (req, res, next) => {
    try {
        const { title, content, userType } = req.body;

        // Validate request body
        const { error} = updateAnnoucementValidator.validate({ title, content, userType, coverImage: req.file?.filename });
        if (error) return res.status(400).json({ message: error.details[0].message });

        // // Only admins should update announcements
        // if (req.user.role !== 'admin') {
        //     return res.status(403).json({ message: "Unauthorized" });
        // }

        // Find and update the announcement
        const announcement = await AnnouncementModel.findByIdAndUpdate(
            req.params.id,
            { title, content, userType, coverImage: req.file?.filename },
            { new: true }  // Returns the updated document
        );

        if (!announcement) return res.status(404).json({ message: "Announcement not found" });

        res.status(200).json(announcement);
    } catch (error) {
        next(error);
    }
};

// Delete an announcement
export const deleteAnnouncement = async (req, res, next) => {
    try {
        // Only admins should delete announcements
        // if (req.user.role !== 'admin') {
        //     return res.status(403).json({ message: "Unauthorized" });
        // }

        // Find and delete the announcement
        const announcement = await AnnouncementModel.findByIdAndDelete(req.params.id);

        if (!announcement) return res.status(404).json({ message: "Announcement not found" });

        res.status(200).json({ message: "Announcement deleted successfully" });
    } catch (error) {
        next(error);
    }
};
