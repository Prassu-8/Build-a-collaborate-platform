import express from 'express';
import { registerStudent } from '../controllers/registerStudent';

const router = express.Router();

router.post('/register', registerStudent);

export default router;
