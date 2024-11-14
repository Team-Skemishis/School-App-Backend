import { UserModel } from "../Models/user.js";
import { mailTransporter } from "../Utils/mail.js";
import { loginUserValidator, registerUserValidator, changePasswordValidator } from "../Validators/user.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const registerUser = async (req,res,next) => {
try {
        const {error, value} = registerUserValidator.validate(req.body)
        if (error) {
            return res.status(422).json(error)   
        }
        
        // Remove confirmPassword before saving to database
        const { confirmPassword, ...userDataToSave } = value;
        
        const user = await UserModel.findOne({email: value.email})
        if (user) {
            return res.status(409).json('User already exists')
        }
        const hashedPassword = bcrypt.hashSync(userDataToSave.password, 10)
        await UserModel.create({...userDataToSave, password: hashedPassword})
        await mailTransporter.sendMail({
            to: value.email,
            subject: 'USER REGISTRATION',
            text: 'Your Account has been registered successfully'
        })
        res.json('user created successfully')
} catch (error) {
    next(error)   
}
}

export const registerTeacher = async (req, res, next) => {
    try {
        const { error, value } = registerUserValidator.validate({...req.body, avatar: req.file?.filename});
        if (error) {
            return res.status(422).json(error);
        }

        // Remove confirmPassword before saving to database
        const { confirmPassword, ...userDataToSave } = value;

        const user = await UserModel.findOne({ email: value.email });
        if (user) {
            return res.status(409).json('User already exists');
        }

        const hashedPassword = bcrypt.hashSync(userDataToSave.password, 10);
        await UserModel.create({ ...userDataToSave, password: hashedPassword });

        // Rest of the email sending code...
        await mailTransporter.sendMail({
            to: value.email,
            subject: 'TEACHER REGISTRATION',
            text: `Dear ${value.firstName} ${value.lastName},\n\nYour account has been registered successfully.\n\nHere are your login details:\nEmail: ${value.email}\nPassword: ${value.password}\n\nFor your security, we strongly recommend that you reset your password after your first login.\n\nTo log in and manage your account, please visit the following link:\n${value.redirectURL}\n\nThank you,\nThe Team`
        });

        res.json('User created successfully');
    } catch (error) {
        next(error);
    }
};

export const registerStudent = async (req, res, next) => {
    try {
        const { error, value } = registerUserValidator.validate({...req.body, avatar: req.file?.filename});
        if (error) {
            return res.status(422).json(error);
        }

        // Remove confirmPassword before saving to database
        const { confirmPassword, ...userDataToSave } = value;

        const user = await UserModel.findOne({ email: value.email });
        if (user) {
            return res.status(409).json('User already exists');
        }

        const hashedPassword = bcrypt.hashSync(userDataToSave.password, 10);
        await UserModel.create({ ...userDataToSave, password: hashedPassword });

        // Rest of the email sending code...
        await mailTransporter.sendMail({
            to: value.email,
            subject: 'STUDENT REGISTRATION',
            text: `Dear ${value.firstName} ${value.lastName},\n\nYour account has been registered successfully.\n\nHere are your login details:\nEmail: ${value.email}\nPassword: ${value.password}\n\nFor your security, we strongly recommend that you reset your password after your first login.\n\nThank you,\nThe Team`
        });

        res.json('User created successfully');
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req,res,next) => {
try {
        const {error,value} = loginUserValidator.validate(req.body)
        if (error) {
            return res.status(422).json(error)
        }
        const user = await UserModel.findOne({email: value.email, role:value.role})
        if (!user) {
            return res.status(404).json('user does not exist')
        }
        const correctPassword = bcrypt.compareSync(value.password, user.password)
        if (!correctPassword) {
            return res.status(401).json('invalid credentials')
        }
    
        const token = jwt.sign(
            {id: user.id},
            process.env.JWT_PRIVATE_KEY,
            {expiresIn: '24h'}
        )
        res.json({
            message: 'user logged in',
            accessToken: token
        })
} catch (error) {
    next(error) 
}
}

export const logOut = (req,res,next) => {
try {
        res.json({
            message: 'user logged out successfully',
            accessToken: null
        })
} catch (error) {
    next(error)    
}
}


export const getAllUsers = async (req,res,next) => {
 try {
    const users =   await UserModel.find({}, '-password')
    res.json(users)
 } catch (error) {
    next(error)  
 }
}

export const getAllTeachers = async (req, res, next) => {
    try {
        // Find users with the role "teacher" and exclude the password field
        const teachers = await UserModel.find({ role: 'teacher' }, '-password');
        res.json(teachers);
    } catch (error) {
        next(error);
    }
};


export const getAllStudents = async (req, res, next) => {
    try {
        // Find users with the role "teacher" and exclude the password field
        const student = await UserModel.find({ role: 'student' }, '-password');
        res.json(student);
    } catch (error) {
        next(error);
    }
};


export const getUserById = async (req,res,next) => {
  try {
      const users = await UserModel.findById(req.params.id, '-password')
      if (!users) {
          return res.status(404).json('user not found')
      }
      res.json(users)
  } catch (error) {
    next(error)
  }
}

export const getTeacherById = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Find the user by id and role, excluding the password field
        const teacher = await UserModel.findOne({ _id: id, role: 'teacher' }, '-password');

        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        res.json(teacher);
    } catch (error) {
        next(error);
    }
};
export const getStudentById = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Find the user by id and role, excluding the password field
        const teacher = await UserModel.findOne({ _id: id, role: 'student' }, '-password');

        if (!teacher) {
            return res.status(404).json({ message: "student not found" });
        }

        res.json(teacher);
    } catch (error) {
        next(error);
    }
};


export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Optional: Validate incoming data if needed
        if (updates.password) {
            updates.password = bcrypt.hashSync(updates.password, 10);
        }

        const updatedUser = await UserModel.findByIdAndUpdate(id, updates, { new: true, select: '-password' });
        if (!updatedUser) {
            return res.status(404).json('User not found');
        }

        res.json({
            message: 'User updated successfully',
            updatedUser
        });
    } catch (error) {
        next(error);
    }
};


export const updateTeacherById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = { ...req.body };

        // Remove email and password fields from the updates to prevent changes
        delete updates.email;
        delete updates.password;

        // Include the avatar if a file is uploaded
        if (req.file) {
            updates.avatar = req.file.filename; // Add or update the avatar field
        }

        // Find the user by ID and role, and update the document
        const updatedTeacher = await UserModel.findOneAndUpdate(
            { _id: id, role: 'teacher' },
            updates,
            { new: true, runValidators: true, select: '-password' }
        );

        if (!updatedTeacher) {
            return res.status(404).json({ message: "Teacher not found or could not be updated" });
        }

        res.json({
            message: 'Teacher updated successfully',
            updatedTeacher
        });
    } catch (error) {
        next(error);
    }
};


export const updateStudentById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = { ...req.body };

        // Remove email and password fields from the updates to prevent changes
        delete updates.email;
        delete updates.password;

        // Include the avatar if a file is uploaded
        if (req.file) {
            updates.avatar = req.file.filename; // Add or update the avatar field
        }

        // Find the user by id and role, and update the document
        const updateStudent = await UserModel.findOneAndUpdate(
            { _id: id, role: 'student' },
            updates,
            { new: true, runValidators: true, select: '-password' }
        );

        if (!updateStudent) {
            return res.status(404).json({ message: "Student not found or could not be updated" });
        }

        res.json({
            message: 'Student updated successfully',
            updateStudent
        });
    } catch (error) {
        next(error);
    }
};


export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedUser = await UserModel.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json('User not found');
        }

        res.json({
            message: 'User deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

export const deleteTeacherById = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Find and delete the user by id and role
        const deletedTeacher = await UserModel.findOneAndDelete({ _id: id, role: 'teacher' });

        if (!deletedTeacher) {
            return res.status(404).json({ message: "Teacher not found or could not be deleted" });
        }

        res.status(200).json({ message: "Teacher successfully deleted" });
    } catch (error) {
        next(error);
    }
};

export const deleteStudentById = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Find and delete the user by id and role
        const deletedStudent = await UserModel.findOneAndDelete({ _id: id, role: 'student' });

        if (!deletedStudent) {
            return res.status(404).json({ message: "student not found or could not be deleted" });
        }

        res.status(200).json({ message: "student successfully deleted" });
    } catch (error) {
        next(error);
    }
};

export const changePassword = async (req, res, next) => {
    try {
        const { error, value } = changePasswordValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }

        // Get user from database (using the id from auth token)
        const user = await UserModel.findById(req.auth.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify current password
        const isCurrentPasswordValid = bcrypt.compareSync(value.currentPassword, user.password);
        if (!isCurrentPasswordValid) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        // Hash new password and update
        const hashedNewPassword = bcrypt.hashSync(value.newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();

        // Send email notification
        await mailTransporter.sendMail({
            to: user.email,
            subject: 'Password Changed Successfully',
            text: `Dear ${user.firstName} ${user.lastName},\n\nYour password has been successfully changed. If you did not make this change, please contact the administrator immediately.\n\nThank you,\nThe Team`
        });

        user.hasChangedDefaultPassword = true;
        await user.save();

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        next(error);
    }
};
