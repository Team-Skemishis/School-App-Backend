import { ClassModel } from "../Models/class.js"
import { addClassValidator, updateClassValidator } from "../Validators/class.js"


export const addClass = async (req, res, next) => {
    try {
        const { error, value } = addClassValidator.validate(req.body)
        if (error) {
            return res.status(422).json(error)
        }
        const classes = await ClassModel.create({ ...value, user: req.auth.id })
        res.status(201).json(classes)
    } catch (error) {
        next(error)
    }
}

export const getAllClass = async (req, res, next) => {
    try {
        const { filter = "{}", sort = "{}", limit = 100, skip = 0 } = req.query
        const classes = await ClassModel
            .find(JSON.parse(filter))
            .sort(JSON.parse(sort))
            .limit(limit)
            .skip(skip)
        res.status(201).json(classes)
    } catch (error) {
        next(error)
    }
}

export const getClassById = async (req, res, next) => {
    try {
        const classes = await ClassModel.findById(req.params.id)
        res.status(200).json(classes)
    } catch (error) {
        next(error)
    }
}

export const updateClass = async (req, res, next) => {
    try {
        const { error, value } = updateClassValidator.validate(req.body)
        if (error) {
            return res.status(422).json(error)
        }
        const classes = await ClassModel.findByIdAndUpdate(req.params.id, value, { new: true })
        res.status(200).json(classes)
    } catch (error) {
        next(error)
    }
}

export const deleteClass = async (req,res,next) => {
    try {
        await ClassModel.findByIdAndDelete(req.params.id)
        res.status(200).json('class deleted successfully')
    } catch (error) {
        next(error)
    }
    }