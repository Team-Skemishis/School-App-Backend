import { StudentModel } from "../Models/student.js";
import { ClassModel } from "../Models/class.js";
import { updateStudentValidator } from "../Validators/student.js";


export const addStudent = async (req,res,next) => {
    try {
        const {firstname,surname, classes, gender, image} = ({ ...req.body, image: req.file?.filename })
        if (!classes){
            return res.status(400).json({
                message: "Student class is required"
            })
        }
        const studentClass = await ClassModel.findOne({classNumber: classes})
        if (!studentClass) {
            return res.status(404).json('class not found')
        }
        const student = await StudentModel.create({ classes: studentClass._id, firstname, surname, gender, image})
        res.status(201).json(student)
    } catch (error) {
        next(error)
    }
    }

export const getAllStudents = async (req, res, next) => {
    try {
        const { filter = "{}", sort = "{}", limit = 100, skip = 0 } = req.query
        const student = await StudentModel
            .find(JSON.parse(filter))
            .sort(JSON.parse(sort))
            .limit(limit)
            .skip(skip)
        res.status(201).json(student)
    } catch (error) {
        next(error)
    }
}

export const getStudentById = async (req, res, next) => {
    try {
        const student = await StudentModel.findById(req.params.id)
        res.status(200).json(student)
    } catch (error) {
        next(error)
    }
}

export const updateStudent = async (req, res, next) => {
    try {
        const {firstname,surname, classes, gender, image} = ({ ...req.body, image: req.file?.filename })
        if (!classes) {
            return res.status(400).json('class field is required')
        }
        const studentClass = await ClassModel.findOne({classNumber: classes})
        if (!studentClass) {
            return res.status(404).json('class not found')
        }
        const student = await StudentModel.findByIdAndUpdate(req.params.id, { classes: studentClass._id, firstname, surname, gender, image}, { new: true })
        res.status(200).json(student)
    } catch (error) {
        next(error)
    }
}

export const deleteStudent = async (req,res,next) => {
    try {
        await StudentModel.findByIdAndDelete(req.params.id)
        res.status(200).json('student deleted successfully')
    } catch (error) {
        next(error)
    }
    }