import { ValidationChain, validationResult } from "express-validator";
import { body, param, query } from 'express-validator'
import { Request, Response, NextFunction } from "express";



const register = [
    body('name')
        .notEmpty()
        .withMessage('name is required'),

    body('email')
        .notEmpty()
        .withMessage('email is required'),

    body('password')
        .notEmpty()
        .withMessage('password is required')
        .isLength({ min: 8 })
        .withMessage('password must be 8 charectar'),

    body('mobilenumber')
        .notEmpty()
        .withMessage('mobile number is required')
        .isLength({ min: 10, max: 10 })
        .withMessage('mobile number must be in 10 letter')
        .isNumeric()
        .withMessage('mobile number is only numbers'),

    body('department')
        .notEmpty()
        .withMessage("department is required")
        .isAlpha()
        .withMessage('department only letter')

]


const login = [
    body('email')
        .notEmpty()
        .withMessage('email is required'),

    body('password')
        .notEmpty()
        .withMessage('password is required')
        .isLength({ min: 8 })
        .withMessage('password must be 8 charectar'),


]



const student = [
    body('name')
        .notEmpty()
        .withMessage('student name is required'),


    body('email')
        .notEmpty()
        .withMessage('email  is required'),

    body('password')
        .notEmpty()
        .withMessage('password  is required'),

    body('department')
        .notEmpty()
        .withMessage('department  is required'),

    body('year')
        .notEmpty()
        .withMessage('year  is required'),

    body('section')
        .notEmpty()
        .withMessage('section  is required'),

    body('rollnumber')
        .notEmpty()
        .withMessage('rollnumber is required'),
]



const event = [
    body('eventname').notEmpty().withMessage('Event name is required'),
    body('from_date').notEmpty().withMessage('From date is required'),
    body('to_date').custom((value, { req }) => {
        if (value <= req.body.from_date) {
            throw new Error('To date must be greater than from date');
        }
        return true;
    }),
    body('strength').notEmpty().withMessage('Strength is required'),
    body('start_time').notEmpty().withMessage('Start time is required'),
    body('end_time').notEmpty().withMessage('End time is required'),
    body('participation').notEmpty().withMessage('Participation is required'),
    body('organized').notEmpty().withMessage('Organized is required'),
    body('department').notEmpty().withMessage('Department name is required')
];








const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            for (const validation of validations) {
                await validation.run(req);
            }

            const errors = validationResult(req);
            if (errors.isEmpty()) {   // if the errors are empty
                return next();    // we are going to next function or controller
            }

            let error = ''

            for (const err of errors.array()) {
                error += err.msg
            }

            res.status(400).json({ error});
        } catch (error) {
            res.status(500).json({ error });
        }
    };
};

module.exports = { validate, register, login, student, event }