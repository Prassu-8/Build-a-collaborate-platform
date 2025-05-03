import { Response, Request, NextFunction, response } from "express";
import { Router } from "express";
import multer from "multer";
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from "uuid";
import  v4  from "uuid";
import  path  from "path";
import FacultySchema from "../model/faculty";
import Students from "../model/Student";
import Events from "../model/Events";
import Registation from "../model/Register";
import Feedbacks from "../model/Feedbacks";
import { ObjectId } from "mongodb";
import { regex } from "uuidv4";
import  PDFDocument  from 'pdfkit';
const jwtverify = require('./token')
const {validate,register,login,student,event } = require('../validation/Faculty');
import galery from "../model/Upload";


const router = Router();

const storage = multer.diskStorage({
    destination: 'faculty',
    filename: (req: any, file: any, cb: any) => {
        const uniqueSuffix = uuidv4();
        const fileExtension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    }
});

const fileFilter = (req:any, file:any, cb:any) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error(`The avatar must be an image in JPG or PNG format only`));
    }
};

const uploads = multer({ storage: storage, fileFilter: fileFilter });

const sendlogins = async(email:any,password:any)=>{
    const transport = nodemailer.createTransport({
        service : 'gamil',
        auth :{
            user: "" ,      //your email
            pass: ''        //your app password
        }
    })

    const sendmail = {
        from : "",   //your mail 
        to:email,
        subject:"This is event Login credentilas",
        text:`Your Login Credentials is ${email} and ${password} `
    }
    await transport.sendMail(sendmail)
}

//faculy register form
router.post('/register',uploads.single('Avathar'),validate(register), async (req: any, res: Response, next: NextFunction) => {
    try {
        const { name, email, password, department,mobilenumber } = req.body;
        


        const faculty  = await FacultySchema.findOne({email:email});
        if(faculty){
            res.status(400).json({
                success:false,
                message:"email already exict"
            })
        }else{


            const newfaculty = await FacultySchema.create({
                name:name,
                email:email,
                password:password,
                department:department,
                mobilenumber:mobilenumber,
                Avathar:req.file.filename
            })
            if(newfaculty){
                //sendlogins(email,password)
                res.status(201).json({
                    success:true,
                    message:"successfully registerd"
                })
            }else{
                res.status(400).json({
                    success:false,
                    message:"invalid credentials try aftr some time"
                })
            }
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});












//faculty login
router.post('/login', validate(login), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const faculty = await FacultySchema.findOne({ email: email, password: password }); // Use findOne instead of find
        console.log(faculty);
        if (!faculty) {
            res.status(400).json({
                success: false,
                message: "Email and password incorrect"
            });
        } else {
            const facultyid = faculty._id; // No need for map, as findOne returns a single document
            console.log(facultyid);
            const token = jwt.sign({ userId: facultyid }, 'ramcharan', { expiresIn: '1hr' });
            res.cookie("token", token, {
                httpOnly: true,
            });
            res.status(200).json({
                success: true,
                message: "Successful login",
                faculty:faculty
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});





//get faculty
router.get('/profile/:id',jwtverify,async(req:Request,res:Response,next:NextFunction)=>{
    const id:any  = req.params.id;
    try{
        const faculty = await FacultySchema.findById(id);
        console.log(faculty)
        if(faculty){
            res.status(200).json({
                success:true,
                faculty:faculty
            })
        }else{
            res.status(400).json({
                success:false,
                message:"no faculty found in this id"
            })
        }

    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
})


// update the profile faculty
router.put('/update/:id', uploads.single('Avathar'),async(req:any,res:Response,next:NextFunction)=>{
    const id:any = req.params.id;
    try{
        
        const faculty = await FacultySchema.findById(id)
        if(!faculty){
            res.status(400).json({
                success:false,
                message:"no faculty found in this id"
            })
        }else{
            const {name,email,password,department,mobilenumber} = req.body;
            
            const upadtefaculty = await FacultySchema.findByIdAndUpdate(id,{
                 name:name,
                 email:email,
                 password:password,
                 department:department,
                 mobilenumber:mobilenumber,
                 Avathar:req.file.filename
            },{new:true})
            if(upadtefaculty){
                res.status(201).json({
                    success:true,
                    message:"updated successfully"
                })
            }else{
                res.status(400).json({
                    success:false,
                    message:"inavlid credentials"
                })
            }
        }

    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
})



router.delete('/faculty/:id',jwtverify,async(req:Request,res:Response,next:NextFunction)=>{
    const id:any = req.params.id;
    try{
        
        const faculty = await FacultySchema.findById(id);
        if(!faculty){
            res.status(404).json({
                success:false,
                message:"no faculty found in this id"
            })
        }else{
            await FacultySchema.findByIdAndDelete(id)
            res.status(200).json({
                success:false,
                message:"delete successfully"
            })
        }

    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
})


//forgot password for the faculty
router.put('/forgot', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            res.status(400).json({
                success:false,
                message:"Email and Password is required"
            })
        }
        const faculty = await FacultySchema.findOne({ email: email });

        if (!faculty) {
            return res.status(404).json({
                success: false,
                message: "No faculty found with this email"
            });
        } else {
            if (password.length < 8) { // Corrected condition
                return res.status(400).json({
                    success: false,
                    message: "Password must be at least 8 characters long"
                });
            }

            const newFaculty = await FacultySchema.findByIdAndUpdate(faculty._id, {
                email: email,
                password: password
            }, { new: true }); // Added { new: true } to return the updated document

            return res.status(200).json({ // Changed status to 200
                success: true,
                message: "Updated successfully",
                faculty: newFaculty
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});





















//section-B

type Student={
    name:string,
    email:string,
    password:string,
    department:string,
    section:string,
    year:string,
    rollnumber:string,
    Avathar:string,
    Type:string
}


const sendlogin = async(email:any,password:any)=>{
    const transport = nodemailer.createTransport({
        service : 'gamil',
        auth :{
            user: "" ,      //your email
            pass: ''        //your app password
        }
    })

    const sendmail = {
        from : "",   //your mail 
        to:email,
        subject:"This is event Login credentilas",
        text:`Your Login Credentials is ${email} and ${password} `
    }
    await transport.sendMail(sendmail)
}




const studentStorage = multer.diskStorage({
    destination: 'student',
    filename: (req: any, file: any, cb: any) => {
        const uniqueSuffix = uuidv4();
        const fileExtension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    }
});

const StudentFilter = (req:any, file:any, cb:any) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error(`The avatar must be an image in JPG or PNG format only`));
    }
};

const upload = multer({ storage: studentStorage, fileFilter: StudentFilter });













//add students
router.post('/student/:id',upload.single('Avathar'),validate(student),async(req:Request,res:Response,next:NextFunction)=>{
           const id:any = req.params.id;
           try{
            const faculty = await FacultySchema.findById(id);
            if(!faculty){
                res.status(404).json({
                    success:false,
                    message:"no faculty found in this id"
                })
            }
            const {name,email,password,department,year,section,rollnumber,Type} = req.body;
            const checkstudents = await Students.findOne({email:email,rollnumber:rollnumber});
            if(checkstudents){
                res.status(400).json({
                    success:false,
                    message:"Student already found in this email,rollnumber"
                })
            }else{

                const students : Partial<Student>  = {
                    name,
                    email,
                    password,
                    department,
                    year,
                    section,
                    rollnumber,
                    Avathar:req.file?.filename,
                    Type
                };

                const newstudent = await Students.create({
                    ...students
                })
                if(newstudent){
                    // await sendlogin(email,password);
                    res.status(201).json({
                        success:true,
                        message:"Student added successfully"
                    })

                }else{
                    res.status(400).json({
                        success:false,
                        message:"some went wroung try after some time"
                    })
                }
            }

           }catch(error){
            console.log(error)
            res.status(500).json({
                success:true,
                message:"internal server error"
            })
           }
})



//get students

router.get('/student/:id', async (req: Request, res: Response, next: NextFunction) => {
    const id: any = req.params.id;
    try {
        const faculty = await FacultySchema.findById(id);
        if (!faculty) {
            return res.status(404).json({
                success: false,
                message: "No faculty found with this id"
            });
        }
        const students = await Students.find().exec();
        if (students.length > 0) {
            return res.status(200).json({
                success: true,
                students: students
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No students found"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});




//student get by id
router.get('/student/:faciltyid/:studentid', async (req: Request, res: Response, next: NextFunction) => {
    const faciltyid: any= req.params;
    const studentid: any= req.params;
    try {
        const faculty = await FacultySchema.findById(faciltyid);
        if (!faculty) {
            return res.status(404).json({
                success: false,
                message: "No faculty found with this id"
            });
        }
        const student = await Students.findById(studentid);
        if (student) {
            return res.status(200).json({
                success: true,
                student: student
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No students found"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});


//student get by rollnumber


router.get('/student/:facultyid', jwtverify, async (req: Request, res: Response, next: NextFunction) => {
    const facultyId: string = req.params.facultyid; // Corrected variable name and type

    try {
        const faculty = await FacultySchema.findById(facultyId);
        if (!faculty) {
            return res.status(404).json({
                success: false,
                message: "No faculty found with this id"
            });
        }
        const { rollnumber } = req.body; // Changed to req.params as it's a GET request
        const student = await Students.find({ rollnumber: { $regex: rollnumber, $options: 'i' } });
        if (student.length > 0) { // Check if any student is found
            return res.status(200).json({
                success: true,
                student: student
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No students found"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});


//update student by faculty 
router.put('/student/:faciltyid/:studentid',upload.single('Avathar'),async(req:Request,res:Response,next:NextFunction)=>{
    const faciltyid: any= req.params.faciltyid as string;
    const studentid: any= req.params.studentid as string;
    try{
        const faculty = await FacultySchema.findById(faciltyid);
        if (!faculty) {
            return res.status(404).json({
                success: false,
                message: "No faculty found with this id"
            });
        }
        const student = await Students.findById(studentid);
        if (student) {
            const {name,email,password,department,year,section,rollnumber,Type} = req.body;
            const updatestudent : Partial<Student> = {
                name,
                email,
                password,
                department,
                year,
                section,
                rollnumber,
                Avathar:req.file?.filename,
                Type
            }
            const update = await Students.findByIdAndUpdate(studentid,{
                ...updatestudent
            },{new:true});
            console.log(update)
            return res.status(200).json({
                success: true,
                student: update
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No students found"
            });
        }


    }catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
})



//delete student by faculty
router.delete('/student/:faciltyid/:studentid',async(req:Request,res:Response,next:NextFunction)=>{
    const faciltyid: any= req.params.faciltyid;
    const studentid: any= req.params.studentid;
    try{
        const faculty = await FacultySchema.findById(faciltyid);
        if (!faculty) {
            return res.status(404).json({
                success: false,
                message: "No faculty found with this id"
            });
        }
        const student = await Students.findById(studentid);
        if (student) {
             await Students.findByIdAndDelete(studentid)
            return res.status(200).json({
                success: true,
                message:"delete success fully"
                
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No students found"
            });
        }


    }catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
})




//section c events 



type event ={
    eventname:string,
    from_date:Date,
    to_date:Date,
    strength:number,
    start_time:string,
    end_time:string,
    participation:string,
    department:string,
    poster:string,
    organized:string
}

const eventStorage = multer.diskStorage({
    destination: "events",
    filename :(req:any,file:any, cb:any)=>{
        const uniqueSuffix = uuidv4();
        const fileExtension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    }
})

const filtertype= (req:any,file:any,cb:any)=>{
const allowedTypes = ['image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error(`The event  must be an image in JPG or PNG format only`));
    }

}

const uploadevents = multer({storage:eventStorage, fileFilter:filtertype})

//faculty add event

router.post('/event/:facultyid', uploadevents.single('poster'), validate(event), async (req: Request, res: Response, next: NextFunction) => {
    const facultyid: any = req.params.facultyid;
    try {
        const faculty = await FacultySchema.findById(facultyid);
        if (!faculty) {
            return res.status(404).json({
                success: false,
                msg: "No faculty found with this id"
            });
        }

        const { eventname, from_date, to_date, strength, start_time, end_time, participation, department, organized } = req.body;

        const startDate = new Date(from_date);
        const endDate = new Date(to_date);
        const currentDate = new Date();

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return res.status(400).json({
                success: false,
                message: "Invalid date format"
            });
        }

        if (startDate < currentDate) {
            return res.status(400).json({
                success: false,
                msg: "Start date must be greater than or equal to current date"
            });
        }

        if (endDate <= startDate) {
            return res.status(400).json({
                success: false,
                msg: "End date must be greater than start date"
            });
        }

        const events: Partial<event> = {
            eventname,
            from_date,
            to_date,
            strength,
            start_time,
            end_time,
            participation,
            department,
            poster: req.file?.filename,
            organized
        };

        const newEvent = await Events.create({
            facultyid: facultyid,
            ...events
        });

        return res.status(201).json({
            success: true,
            msg: "Event created successfully",
            data: newEvent
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
});




//faculty get futureevent
router.get('/upcome/:facultyId', async (req: Request, res: Response, next: NextFunction) => {
    const facultyId: any = req.params.facultyId;
    const page: number = parseInt(req.query.page as string) || 1; // Default page is 1
    const limit: number = 12; // Events per page

    try {
        const faculty = await FacultySchema.findById(facultyId);
        if (!faculty) {
            return res.status(404).json({
                success: false,
                message: "No faculty found with this id"
            });
        }

        const totalEventsCount = await Events.countDocuments(); // Total number of events

        const events = await Events.find({facultyid:facultyId}).sort({ to_date: -1 }).skip((page - 1) * limit).limit(limit).exec();
        console.log(events);
        const currentDate = new Date()
        const futureevent =  await events.filter((item:any)=>{
            return item.from_date > currentDate
        })

        if (futureevent.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No events found"
            });
        }

        res.status(200).json({
            success: true,
            currentPage: page,
            totalPages: Math.ceil(totalEventsCount / limit),
            events: futureevent
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});


//faculty get all events 
router.get('/event/:facultyid',jwtverify, async (req: Request, res: Response, next: NextFunction) => {
    const facultyId: any = req.params.facultyid;
    const page: number = parseInt(req.query.page as string) || 1; // Default page is 1
    const limit: number = 12; // Events per page

    try {
        const faculty = await FacultySchema.findById(facultyId);
        if (!faculty) {
            return res.status(404).json({
                success: false,
                message: "No faculty found with this id"
            });
        }

        const totalEventsCount = await Events.countDocuments(); // Total number of events

        const events = await Events.find().sort({ to_date: -1 }).skip((page - 1) * limit).limit(limit).exec();
        console.log(events);
        
        if (events.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No events found"
            });
        }

        res.status(200).json({
            success: true,
            currentPage: page,
            totalPages: Math.ceil(totalEventsCount / limit),
            events: events
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

//faculty update the events 


router.put('/event/:facultyid/:eventid', uploadevents.single('poster'), async (req: Request, res: Response, next: NextFunction) => {
    const facultyid: string = req.params.facultyid;
    const eventid: string = req.params.eventid;
    try {
        const faculty = await FacultySchema.findById(facultyid);
        if (!faculty) {
            return res.status(404).json({
                success: false,
                message: "No faculty found with this id"
            });
        }

        const event = await Events.findOne({ _id: eventid, facultyid: facultyid });
        if (!event) {
            return res.status(404).json({
                success: false,
                message: "No event found with this id"
            });
        }

        const { eventname, from_date, to_date, strength, start_time, end_time, participation, department, organized } = req.body;

        const startDate = new Date(from_date);
        const endDate = new Date(to_date);
        const currentDate = new Date();

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return res.status(400).json({
                success: false,
                message: "Invalid date format"
            });
        }

        if (startDate < currentDate) {
            return res.status(400).json({
                success: false,
                message: "Start date must be greater than or equal to current date"
            });
        }

        if (endDate <= startDate) {
            return res.status(400).json({
                success: false,
                message: "End date must be greater than start date"
            });
        }

        const updatedEvent = await Events.findByIdAndUpdate(eventid, {
            eventname,
            from_date,
            to_date,
            strength,
            start_time,
            end_time,
            participation,
            department,
            poster: req.file?.filename,
            organized
        }, { new: true }) as event[];

        return res.status(200).json({
            success: true,
            message: "Event updated successfully",
            data: updatedEvent
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

// faculty delete the their events
router.delete('/event/:facultyid/:eventid',async(req:Request,res:Response,next:NextFunction)=>{
    const facultyid: string = req.params.facultyid as string;
    const eventid: string = req.params.eventid as string;
    try {
        const faculty = await FacultySchema.findById(facultyid);
        if (!faculty) {
            return res.status(404).json({
                success: false,
                message: "No faculty found with this id"
            });
        }

        const event = await Events.findOne({ _id: eventid, facultyid: facultyid });
        if (!event) {
            return res.status(404).json({
                success: false,
                message: "No event found with this id"
            });
        }


        await Events.findByIdAndDelete(eventid);

        return res.status(200).json({
            success: true,
            message: "Event delete successfully",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
    
})


//faculty get their history
router.get('/history/:facultyId', async (req: Request, res: Response, next: NextFunction) => {
    const facultyId: any = req.params.facultyId;
   // const page: number = parseInt(req.query.page as string) || 1; // Default page is 1
  //  const limit: number = 12; // Events per page

    try {
        const faculty = await FacultySchema.findById(facultyId);
        if (!faculty) {
            return res.status(404).json({
                success: false,
                message: "No faculty found with this id"
            });
        }

       // const totalEventsCount = await Events.countDocuments(); // Total number of events

        const events = await Events.find({facultyid:facultyId}).exec();
        console.log(events);
        const currentDate = new Date()
        const futureevent =  await events.filter((item:any)=>{
            return item.from_date < currentDate
        })

        if (futureevent.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No events found"
            });
        }

        res.status(200).json({
            success: true,
          //  currentPage: page,
         //   totalPages: Math.ceil(totalEventsCount / limit),
            events: futureevent
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});





//section d 

//faculty can get the student registation 


router.get('/application/:facultyId/:eventId', async (req: Request, res: Response) => {
    const facultyId: string = req.params.facultyId;
    const eventId: string = req.params.eventId;

    try {
        const faculty = await FacultySchema.findById(facultyId);
        if (!faculty) {
            return res.status(404).json({
                success: false,
                message: "No faculty found"
            });
        }

        const event = await Events.findOne({ _id: eventId, facultyid: facultyId });
        if (!event) {
            return res.status(404).json({
                success: false,
                message: "No event found with this ID"
            });
        }

        const registeredStudents = await Registation.find({ eventid: eventId, status:"processing" })

        if (!registeredStudents) {
            return res.status(404).json({
                success: false,
                message: "No registrations found for this event"
            });
        }

        res.status(200).json({
            success: true,
            registeredStudents: registeredStudents
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});





const sendmailaccept = async (email: string | null | undefined) => {
    // Check if email is not null or undefined before using it
    if (email) {
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "", // your email
                pass: ''  // your app password
            }
        });

        const mailOptions = {
            from: "",               // your email
            to: email,
            subject: "This is message event",
            text: "Your application has been accepted."
        };

        await transport.sendMail(mailOptions);
    }
};

const sendmailreject = async (email: string | null | undefined) => {
    // Check if email is not null or undefined before using it
    if (email) {
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "", // your email
                pass: ''  // your app password
            }
        });

        const mailOptions = {
            from: "",               // your email
            to: email,
            subject: "This is message event",
            text: "Your application has been rejected by the admin."
        };

        await transport.sendMail(mailOptions);
    }
};
//change status
router.put('/application/:registerId', async (req: Request, res: Response, next: NextFunction) => {
    const registerId: string = req.params.registerId;

    try {
        const student = await Registation.findById(registerId);
        console.log(student)
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "No registration found with this ID"
            });
        }

        const statu: string = req.body.status as string; // Ensure proper access to status
        console.log("Status:", statu); // Log status for debugging
        console.log("Register ID:", registerId); // Log register ID for debugging
        if (statu.trim() === "accept") { // Trim status for comparison
            await Registation.findByIdAndUpdate(registerId, { status: statu });
            await sendmailaccept(student.email);
            return res.status(200).json({
                success: true,
                message: "Application accepted by the faculty"
            });
        } else if (statu.trim() === 'reject') { // Trim status for comparison
            await Registation.findByIdAndUpdate(registerId, { status: statu });
            await sendmailreject(student.email);
            await Registation.findByIdAndDelete(registerId);
            return res.status(200).json({
                success: true,
                message: "Application rejected by the faculty"
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid status provided"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});




//student get the all event completed student
router.get('/completed/:eventId',async(req:Request,res:Response,next:NextFunction)=>{
    const eventId : string = req.params.eventId;
    try{
        const student = await Registation.find({eventid:eventId});
        if(student.length === 0){
            return res.status(404).json({
                success:false,
                message:"no student attend this event"
            })

        }
        return res.status(200).json({
            success:true,
            student
        })


        
    }catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }

})





//send certificate

// const generateCertificatePDF = async (students: any[], certificateDesign: string): Promise<Buffer> => {
//     const doc = new PDFDocument();
//     let pdfBuffer: Buffer = Buffer.from([]);

//     // Customize certificate design here
//     doc.fontSize(25).text(`Certificate Design: ${certificateDesign}`, { align: 'center' });
//     students.forEach(student => {
//         doc.text(`Name: ${student.name}`, { align: 'left' });
//         doc.text(`Department: ${student.department}`, { align: 'left' });
//         doc.text(`Year: ${student.year}`, { align: 'left' });
//         doc.text(`Event ID: ${student.eventid}`, { align: 'left' });
//         doc.addPage();
//     });

//     // Generate buffer from PDF document
//     pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
//         const buffers: Buffer[] = [];
//         doc.on('data', buffers.push.bind(buffers));
//         doc.on('end', () => {
//             resolve(Buffer.concat(buffers));
//         });
//         doc.end();
//     });

//     return pdfBuffer;
// };

// const sendCertificatesByEmail = async (pdfBuffer: Buffer, students: { email: string }[]) => {
//     const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//             user: "your.email@gmail.com",
//             pass: "yourAppPassword"
//         }
//     });

//     for (const student of students) {
//         const mailOptions: nodemailer.SendMailOptions = {
//             from: 'your@email.com',
//             to: student.email,
//             subject: `Certificate of event `,
//             text: 'Please find attached your certificate.',
//             attachments: [{
//                 filename: 'certificate.pdf',
//                 content: pdfBuffer,
//                 contentType: 'application/pdf'
//             }]
//         };

//         try {
//             await transporter.sendMail(mailOptions);
//             console.log(`Certificate sent to ${student.email}`);
//         } catch (error) {
//             console.error(`Error sending email to ${student.email}: ${error}`);
//         }
//     }
// };
// //send certificate
// router.post('/completed/:eventId',  async (req: Request, res: Response) => {
//     const eventId = req.params.eventId;
//     const { certificateDesign } = req.body;

//     try {
//         const students: Array<any> = await Registation.find({ eventid: eventId });
//         if (students.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: "No student attended this event"
//             });
//         }

//         // Generate PDF with selected certificate design and student details
//         const pdfBuffer = await generateCertificatePDF(students, certificateDesign);

//         // Send PDF via email
//         await sendCertificatesByEmail(pdfBuffer, students);

//         res.status(200).json({
//             success: true,
//             message: 'Certificates sent successfully'
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             success: false,
//             message: 'Internal server error'
//         });
//     }
// });



















router.get('/completedstudents/:eventId', async (req: Request, res: Response, next: NextFunction) => {
    const eventId: string = req.params.eventId;

    try {
        // Find the event by its ID
        const event = await Events.findById(eventId);
        if (!event) {
            return res.status(404).json({
                success: false,
                message: "No event found with this ID"
            });
        }

        // Find students registered for the event with status 'accept'
        const students = await Registation.find({ eventid: eventId , status:'accept' });
        console.log(students)
        if (students.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No students registered for this event"
            });
        }

        // If everything is successful, return the list of students
        return res.status(200).json({
            success: true,
            students: students
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});



const generateCertificatePDF = async (students: any[], certificateDesign: string): Promise<Buffer> => {
    const doc = new PDFDocument();
    let pdfBuffer: Buffer = Buffer.from([]);

    // Customize certificate design here
    doc.fontSize(25).text(`Certificate Design: ${certificateDesign}`, { align: 'center' });
    students.forEach(student => {
        doc.text(`Name: ${student.name}`, { align: 'left' });
        doc.text(`Department: ${student.department}`, { align: 'left' });
        doc.text(`Year: ${student.year}`, { align: 'left' });
        doc.text(`Event ID: ${student.eventid}`, { align: 'left' });
        doc.addPage();
    });

    // Generate buffer from PDF document
    pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
        const buffers: Buffer[] = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
            resolve(Buffer.concat(buffers));
        });
        doc.end();
    });

    return pdfBuffer;
};

const sendCertificatesByEmail = async (pdfBuffer: Buffer, students: { email: string }[]) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "your.email@gmail.com",
            pass: "yourAppPassword"
        }
    });

    for (const student of students) {
        const mailOptions: nodemailer.SendMailOptions = {
            from: 'your@email.com',
            to: student.email,
            subject: `Certificate of event `,
            text: 'Please find attached your certificate.',
            attachments: [{
                filename: 'certificate.pdf',
                content: pdfBuffer,
                contentType: 'application/pdf'
            }]
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log(`Certificate sent to ${student.email}`);
        } catch (error) {
            console.error(`Error sending email to ${student.email}: ${error}`);
            throw error; // Rethrow error to handle it in the caller function
        }
    }
};

router.post('/completed/:eventId', async (req: Request, res: Response) => {
    const eventId = req.params.eventId;
    const { certificateDesign } = req.body; // Ensure frontend sends certificate design

    try {
        const students: Array<any> = await Registation.find({ eventid: eventId });
        if (students.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No student attended this event"
            });
        }

        // Generate PDF with selected certificate design and student details
        const pdfBuffer = await generateCertificatePDF(students, certificateDesign);

        // Send PDF via email
        await sendCertificatesByEmail(pdfBuffer, students);

        res.status(200).json({
            success: true,
            message: 'Certificates sent successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});








//get the the feedback










// router.get('/feedbacks/:eventId',async(req:Request,res:Response,next:NextFunction)=>{
//     const eventId : string =  req.params.eventId as string;
//     try{
//         const feedbacks = await Feedbacks.find({event:eventId});
//         if(feedbacks.length === 0){
//             res.status(500).json({
//                 success: false,
//                 message: 'no feedback found'
//             });
//         }
//         console.log(feedbacks);
//         const studentid = feedbacks.map((item:any)=>{
//             return item.student
//         })
//         const student = await Students.findById({$in:{studentid}})
//         return res.status(200).json({
//             success:true,
//             feedback:feedbacks,
//             student:student
//         })

//     }catch(error){
//         console.log(error)
//         res.status(500).json({
//             success: false,
//             message: 'Internal server error'
//         });
//     }
// })




router.get('/feedbacks/:eventId', async (req: Request, res: Response, next: NextFunction) => {
    const eventId: string = req.params.eventId as string;
    try {
        const feedbacks = await Feedbacks.find({ event: eventId });
        if (feedbacks.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No feedback found'
            });
        }

        const studentIds = feedbacks.map((item: any) => item.student);
        const students = await Students.find({ _id: { $in: studentIds } });

        // Combine feedbacks and students into one array
        const feedbacksWithStudents = feedbacks.map((feedback: any) => {
            const student = students.find((student: any) => student._id.toString() === feedback.student.toString());
            return {
                feedback: feedback,
                student: student
            };
        });

        return res.status(200).json({
            success: true,
            feedbacks: feedbacksWithStudents
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});




















//get the events all
router.get('/allevents/:facultyId', async (req: Request, res: Response, next: NextFunction) => {
    const facultyId: string = req.params.facultyId;
    const page: number = parseInt(req.query.page as string) || 1;
    const limit: number = 12;
    try {
        const checkfaculty = await FacultySchema.findById(facultyId);
        if (!checkfaculty) {
            return res.status(404).json({
                success: false,
                message: 'No faculty found with this id'
            });
        }
        const totalEvents = await Events.countDocuments();
        const events = await Events.find().sort({ from_date: 1 }).skip((page - 1) * limit).limit(limit).exec();
        console.log(events);
        const currentDate = new Date();
        const futureEvents = events.filter((item: any) => {
            return new Date(item.from_date) > currentDate; // Assuming from_date is the correct field name for event start date
        });

        if (futureEvents.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No future events found"
            });
        }

        res.status(200).json({
            success: true,
            currentPage: page,
            totalPages: Math.ceil(totalEvents / limit),
            events: futureEvents
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});


//faculty view event details
router.get('/eventdetails/:facultyId/:eventId', async (req: Request, res: Response, next: NextFunction) => {
    const facultyId: string = req.params.facultyId; // Corrected parameter name
    const eventId: string = req.params.eventId; // Corrected parameter name

    try {
        const faculty = await FacultySchema.findById(facultyId);
        if (!faculty) {
            return res.status(404).json({
                success: false,
                message: "No faculty found with this ID" // Updated error message
            });
        }

        const event = await Events.findById(eventId);
        if (event) {
            return res.status(200).json({
                success: true,
                event: event
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No event found with this ID" // Updated error message
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});


const pics = multer.diskStorage({
    destination: 'galery',
    filename: (req:any, file:any, cb:any) => {
        const uniqueSuffix = uuidv4();
        const fileExtension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    }
});

const fileFilters = (req:any, file:any, cb:any) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error(`The avatar must be an image in JPG or PNG format only`));
    }
};

const galerys = multer({ storage: pics, fileFilter: fileFilters });

router.post('/image/:facultyId/:eventId', galerys.array('images', 5), async (req, res, next) => {
    const facultyId = req.params.facultyId;
    const eventId = req.params.eventId;
    try {
        const faculty = await Events.findOne({ _id: eventId, facultyid: facultyId });
        console.log(faculty?._id)
        if (!faculty) {
            return res.status(500).json({
                success: false,
                message: "No faculty found with this ID"
            });
        }
        
        // Check if req.files exists and is an array
        if (!Array.isArray(req.files) || req.files.length < 1) {
            return res.status(400).json({
                success: false,
                message: "Please upload at least 1 image."
            });
        }

        // Extract filenames from the uploaded images
        const imageFilenames: string[] = req.files.map((image: Express.Multer.File) => image.filename);

        const { text } = req.body;

        const createdGalery = await galery.create({
            faculty: facultyId,
            event: eventId,
            image: imageFilenames,
            text: text,
            date: Date.now()
        });

        return res.status(200).json({
            success: true,
            message: "Images uploaded successfully",
            data: createdGalery
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});





//faculty galery
router.get('/pics/:id', async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id; // No need to cast it as string, it's already a string
    try {
        const student = await FacultySchema.findById(id);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "No student data with this id"
            });
        } else {
            // Find all gallery items associated with the student
            const data = await galery.find().exec();
            console.log(data);
            if (data.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No gallery found for this student"
                });
            }
            return res.status(200).json({
                success: true,
                gallery: data // Changed 'galery' to 'gallery' for consistency
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});



router.delete('/logout/:id', async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id; // Get the id from params, not from body
    try {
        const student = await FacultySchema.findById(id);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "No student data with this id"
            });
        } else {
            // Clear the token cookie
            res.clearCookie('token'); // Changed req.cookies to res.clearCookie
            return res.status(200).json({
                success: true,
                message: "Logout Success"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});



router.get('/serachevent/:id', async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id as string;
    try {
        const student = await FacultySchema.findById(id);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "No student found with this id"
            });
        }
        const name = req.query.name as string | undefined;
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Name query parameter is missing"
            });
        }
        const events = await Events.find({ eventname: { $regex: name, $options: 'i' } }).sort({from_date : -1});
        if (events.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No events found matching the provided name"
            });
        } else {
            return res.status(200).json({
                success: true,
                events: events
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});






export default router;
