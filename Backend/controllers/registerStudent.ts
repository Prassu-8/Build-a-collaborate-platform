import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import StudentModel from '../model/studentModel';

export const registerStudent = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingStudent = await StudentModel.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new StudentModel({
      name,
      email,
      password: hashedPassword
    });

    await newStudent.save();
    res.status(201).json({ message: 'Student registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
