import multer from "multer";
import { multerSaveFilesOrg } from "multer-savefilesorg";

export const assignmentFile = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: '/school-app/*'
    }),
    preservePath: true
})
export const studentUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: '/student-upload/*'
    }),
    preservePath: true
})
export const staffUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: '/student-upload/*'
    }),
    preservePath: true
})
export const teacherAvatar = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: '/teachers-avatar/*'
    }),
    preservePath: true
})

export const adminAvatar = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: '/admin-avatar/*'
    }),
    preservePath: true
})

export const studentAvatar = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: '/students-avatar/*'
    }),
    preservePath: true
})
export const announcementImage = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: '/announcement-images/*'
    }),
    preservePath: true
})