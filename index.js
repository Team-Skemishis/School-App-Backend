import express from "express"
import mongoose from "mongoose"
import userRouter from "./Routes/user.js"
import cors from 'cors'
import assignmentRouter from "./Routes/assignment.js"
import studentRouter from "./Routes/student.js"

await mongoose.connect(process.env.MONGO_URI)

const app = express()

app.use(express.json())
app.use(cors())

app.use(userRouter)
app.use(assignmentRouter)
app.use(studentRouter)


const port = 3004

app.listen(port, () => {
     console.log(`App is listening on server ${port}`)
})