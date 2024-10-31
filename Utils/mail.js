import { createTransport } from "nodemailer";

export const mailTransporter = createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth:{
        user: 'romeoasante66@gmail.com',
        pass: 'vobbrcjesijpdegb'
    },
    from: 'romeoasante66@gmail.com'
})