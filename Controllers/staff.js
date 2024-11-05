import { StaffModel } from "../Models/staff.js"
import { addStaffValidator, updateStaffValidator } from "../Validators/staff.js"

export const addStaffs = async (req, res, next) => {
    try {
        const { error, value } = addStaffValidator.validate({ ...req.body, image:req.file?.filename })
        if (error) {
            return res.status(422).json(error)
        }
        const staff = await StaffModel.create({ ...value, user: req.auth.id })
        res.status(201).json(staff)
    } catch (error) {
        next(error)
    }
}

export const getAllStaffs = async (req, res, next) => {
    try {
        const { filter = "{}", sort = "{}", limit = 100, skip = 0 } = req.query
        const staff = await StaffModel
            .find(JSON.parse(filter))
            .sort(JSON.parse(sort))
            .limit(limit)
            .skip(skip)
        res.status(201).json(staff)
    } catch (error) {
        next(error)
    }
}

export const getStaffById = async (req, res, next) => {
    try {
        const staff = await StaffModel.findById(req.params.id)
        res.status(200).json(staff)
    } catch (error) {
        next(error)
    }
}

export const updateStaffs = async (req, res, next) => {
    try {
        const { error, value } = updateStaffValidator.validate({ ...req.body, image: req.file?.filename })
        if (error) {
            return res.status(422).json(error)
        }
        const staff = await StaffModel.findByIdAndUpdate(req.params.id, value, { new: true })
        res.status(200).json(staff)
    } catch (error) {
        next(error)
    }
}

export const deleteStaffs = async (req,res,next) => {
    try {
        await StaffModel.findByIdAndDelete(req.params.id)
        res.status(200).json('staff deleted successfully')
    } catch (error) {
        next(error)
    }
    }