import { attendanceModel } from "../Models/attendance.js";

// Add attendance for a student
export const addAttendance = async (req, res) => {
    try {
        const { studentID, classID } = req.body;

        // Check for required fields
        if (!studentID || !classID) {
            return res.status(400).json({ message: "Student ID and Class ID are required" });
        }

        // Calculate date range for the last 24 hours
        const now = new Date();
        const twentyFourHoursAgo = new Date(now.getTime() - (24 * 60 * 60 * 1000));

        // Check for existing attendance in the last 24 hours
        const existingAttendance = await attendanceModel.findOne({
            studentID,
            classID,
            createdAt: {
                $gte: twentyFourHoursAgo,
                $lte: now
            }
        });

        if (existingAttendance) {
            return res.status(400).json({ 
                message: "Attendance already marked for this student in this class within the last 24 hours" 
            });
        }

        // Create new attendance record
        const newAttendance = await attendanceModel.create({
            studentID,
            classID
        });



        res.status(201).json(newAttendance);
    } catch (error) {
        console.error('Error in addAttendance:', error);
        res.status(500).json({ message: "Error adding attendance", error: error.message });
    }
};

// Get attendance records by class ID
export const getStudentAttendance = async (req, res) => {
    try {
        const classID = req.params.id;
        
        console.log('Class ID:', classID);
        
        if (!classID) {
            return res.status(400).json({ message: "Class ID is required" });
        }

        const attendanceRecords = await attendanceModel.find({ classID })
            .populate('studentID', 'name')
            .populate('classID', 'className');
        
        if (!attendanceRecords || attendanceRecords.length === 0) {
            return res.status(404).json({ message: "No attendance records found for this class" });
        }
            
        res.status(200).json(attendanceRecords);
    } catch (error) {
        console.error('Error in getStudentAttendance:', error);
        res.status(500).json({ message: "Error fetching attendance", error: error.message });
    }
};

// Update attendance
export const updateStudentAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updatedAttendance = await attendanceModel.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedAttendance) {
            return res.status(404).json({ message: "Attendance record not found" });
        }

        res.status(200).json({ message: "Attendance updated successfully", attendance: updatedAttendance });
    } catch (error) {
        res.status(500).json({ message: "Error updating attendance", error: error.message });
    }
};

// Delete attendance
export const deleteStudentAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedAttendance = await attendanceModel.findByIdAndDelete(id);
        
        if (!deletedAttendance) {
            return res.status(404).json({ message: "Attendance record not found" });
        }

        res.status(200).json({ message: "Attendance deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting attendance", error: error.message });
    }
};

// Get attendance by ID
export const getAttendanceById = async (req, res, next) => {
    try {
        const attendance = await attendanceModel.findById(req.params.id)
        res.status(201).json(attendance)
    } catch (error) {
        next(error)
    }
}
