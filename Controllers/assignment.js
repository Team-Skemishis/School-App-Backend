import { AssignmentModel } from "../Models/assignment.js";
import { assignmentValidator, UpdateAssignmentValidator } from "../Validators/assignment.js";


export const addAssignment = async (req, res, next) => {
    try {
        const { error, value } = assignmentValidator.validate({...req.body, file: req.file?.filename})
        if (error) {
            return res.status(422).json(error)
        }
        await AssignmentModel.create({...value, user:req.auth.id})
        res.status(201).json('assignment was added')
    } catch (error) {
        next(error)
    }
}

export const getAllAssignments = async (req, res, next) => {
    try {
        const { filter = "{}", sort = "{}", limit = 100, skip = 0 } = req.query;
        const assignment = await AssignmentModel
            .find(JSON.parse(filter))
            .sort(JSON.parse(sort))
            .limit(limit)
            .skip(skip)
        res.status(200).json(assignment)
    } catch (error) {
        next(error)
    }
}

export const getAssignmentById = async (req, res, next) => {
try {
    const idAssignment = await AssignmentModel.findById(req.params.id)
    res.status(201).json(idAssignment)
} catch (error) {
    next(error)   
}
}

export const updateAssignment = async (req, res, next) => {
try {
    const {error,value} = UpdateAssignmentValidator.validate({...req.body, file: req.file?.filename})
    if (error) {
        return res.status(422).json(error);
    }
    const assignment = await AssignmentModel.findOneAndUpdate( { _id: req.params.id, user: req.auth.id }, value, { new: true })
    if (!assignment){
        return res.status(404).json('Assignment not found')
    }
    res.json(value)
} catch (error) {
    next(error)   
}
}


export const deleteAssignment = async (req, res, next) => {
try {
        const del = await AssignmentModel.findOneAndDelete({ _id: req.params.id, user: req.auth.id })
        if (!del) {
            return res.status(404).json('Ad not found')
        }
        res.status(200).json('Assignment deleted successfully')
} catch (error) {
    next(error)
}
}