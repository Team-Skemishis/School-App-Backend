
import { UserModel } from "../Models/user.js";
import { mailTransporter } from "../Utils/mail.js";
import { loginUserValidator, registerUserValidator } from "../Validators/user.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const registerUser = async (req,res,next) => {
try {
        const {error, value} = registerUserValidator.validate(req.body)
        if (error) {
            return res.status(422).json(error)   
        }
       const user = await UserModel.findOne({email: value.email})
        if (user) {
            return res.status(409).json('User already exists')
        }
        const hashedPassword = bcrypt.hashSync(value.password, 10)
        await UserModel.create({...value, password: hashedPassword})
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
        const { error, value } = registerUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }

        // Check if the user already exists
        const user = await UserModel.findOne({ email: value.email });
        if (user) {
            return res.status(409).json('User already exists');
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(value.password, 10);

        // Create the new user
        await UserModel.create({ ...value, password: hashedPassword });

        // Send an email with email and password details, including a recommendation to reset the password
        await mailTransporter.sendMail({
            to: value.email,
            subject: 'TEACHER REGISTRATION',
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
