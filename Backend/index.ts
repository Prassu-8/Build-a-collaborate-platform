import Express, { json, urlencoded } from "express";
import mongoose from "mongoose";
import cookieparser from 'cookie-parser';
import Faculty from './controllers/Faculty';
import Student from './controllers/Student';
import studentRoutes from './routes/studentRoutes';
import cors from 'cors'


const app = Express()
const PORT = 3000;
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cookieparser());
// app.use(cors())
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from all origins
    credentials: true, // Allow credentials (e.g., cookies, authorization headers)
    // allowedHeaders: ['Authorization', 'Content-Type']
}));
app.use('/events', Express.static('events'))
app.use('/faculty', Express.static('faculty'))
app.use('/student', Express.static('student'));
app.use('/galery', Express.static('galery'));



mongoose.connect("mongodb://127.0.0.1:27017/Aditya").then(() => {
    app.listen(PORT, () => {
        console.log(`server is running this ${PORT}`)
    })
    console.log(`mongodb is connected`)
})


app.use('/faculty', Faculty);
app.use('/student', Student)
app.use('/api/student', studentRoutes);
