import { StudentModel } from "../Models/student.js";
import { addStudentValidator, updateStudentValidator } from "../Validators/student.js";


export const addStudent = async (req, res, next) => {
    try {
        const { error, value } = addStudentValidator.validate({ ...req.body, image:req.file?.filename })
        if (error) {
            return res.status(422).json(error)
        }
        const student = await StudentModel.create({ ...value, user: req.auth.id })
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
        const { error, value } = updateStudentValidator.validate({ ...req.body, image: req.file?.filename })
        if (error) {
            return res.status(422).json(error)
        }
        const student = await StudentModel.findByIdAndUpdate(req.params.id, value, { new: true })
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