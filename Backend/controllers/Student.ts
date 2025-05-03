import { Router, response } from "express";
const router = Router();
import Students from "../model/Student";
import Events from "../model/Events";
import Feedbacks from "../model/Feedbacks";
import Registation from "../model/Register";
import Galery from "../model/Upload";
import jwt from 'jsonwebtoken';
import { studenttoken } from "./studenttoken";
import { Request,Response,NextFunction } from 'express';


type login = {
    email:string,
    password:string
}

//student login

router.post('/loginleo', async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const {email,password} = req.body;
        const student = await Students.findOne({email:email,password:password,Type:'leo'});
        console.log(student ,"leao")
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign({ userId: student.id }, "student", { expiresIn: "1hr" });
        res.cookie('token', token, {
            httpOnly: true
        });

        return res.status(200).json({
            success: true,
            message: "Successfully logged in",
            student: student
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});



//nss
router.post('/loginnss', async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const {email,password} = req.body;
        const student = await Students.findOne({email:email,password:password,Type:'nss'});
        console.log(student ,"leao")
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign({ userId: student.id }, "student", { expiresIn: "1hr" });
        res.cookie('token', token, {
            httpOnly: true
        });

        return res.status(200).json({
            success: true,
            message: "Successfully logged in",
            student: student
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});


//rss
router.post('/loginrss', async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const {email,password} = req.body;
        const student = await Students.findOne({email:email,password:password,Type:'rss'});
        console.log(student ,"leao")
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign({ userId: student.id }, "student", { expiresIn: "1hr" });
        res.cookie('token', token, {
            httpOnly: true
        });

        return res.status(200).json({
            success: true,
            message: "Successfully logged in",
            student: student
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});


// //forgot password leo
// router.put('/forgotleo', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) { // Checking if email or password is missing
//             return res.status(400).json({
//                 success: false,
//                 message: "Email and password are required"
//             });
//         }

//         const student = await Students.findOne({ email: email, Type: 'leo' });
        
//         if (!student) {
//             return res.status(404).json({
//                 success: false,
//                 message: "No student found with this email"
//             });
//         } else {
//             if (password.length < 8) { // Corrected condition
//                 return res.status(400).json({
//                     success: false,
//                     message: "Password must be at least 8 characters long"
//                 });
//             }
//             const newStudent = await Students.findByIdAndUpdate(student._id, {
//                 email: email,
//                 password: password
//             }, { new: true });

//             return res.status(200).json({
//                 success: true,
//                 message: "Password successfully changed",
//                 student: newStudent
//             });
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error"
//         });
//     }
// });


// //forgot password nss
// router.put('/forgotnss', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { email, password } = req.body;
//         if (!email || !password) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Email and Password are required"
//             });
//         }
//         const student = await Students.findOne({ email: email, Type: 'nss' });
//         if (!student) {
//             return res.status(404).json({
//                 success: false,
//                 message: "No student found with this email"
//             });
//         }
//         if (password.length < 8) { // Corrected condition
//             return res.status(400).json({
//                 success: false,
//                 message: "Password must be at least 8 characters long"
//             });
//         }
//         const newStudent = await Students.findByIdAndUpdate(student._id, {
//             email: email,
//             password: password
//         }, { new: true });
//         return res.status(200).json({
//             success: true,
//             message: "Password successfully changed",
//             student: newStudent
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error"
//         });
//     }
// });


// //forgot password rss
// router.put('/forgotrss', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { email, password } = req.body;
//         if (!email || !password) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Email and Password are required"
//             });
//         }
//         const student = await Students.findOne({ email: email, Type: 'rss' });
//         if (!student) {
//             return res.status(404).json({
//                 success: false,
//                 message: "No student found with this email"
//             });
//         }
//         if (password.length < 8) { // Corrected condition
//             return res.status(400).json({
//                 success: false,
//                 message: "Password must be at least 8 characters long"
//             });
//         }
//         const newStudent = await Students.findByIdAndUpdate(student._id, {
//             email: email,
//             password: password
//         }, { new: true });
//         return res.status(200).json({
//             success: true,
//             message: "Password successfully changed",
//             student: newStudent
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error"
//         });
//     }
// });



//change password
router.put('/changepassword/:id', async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        const student = await Students.findById(id);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "No student data with this id"
            });
        } else {
            const { oldpassword, newpassword, confirmpassword } = req.body;
            if (newpassword.length < 8) {
                return res.status(400).json({
                    success: false,
                    message: "New password must be at least 8 characters long"
                });
            }
            if (newpassword !== confirmpassword) {
                return res.status(400).json({
                    success: false,
                    message: "New password and confirm password do not match"
                });
            }
            if (oldpassword !== student.password) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid old password"
                });
            }
            await Students.findByIdAndUpdate(id, { password: newpassword });
            return res.status(200).json({
                success: true,
                message: "Password updated successfully"
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



//view galery
router.get('/pics/:id', async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id; // No need to cast it as string, it's already a string
    try {
        const student = await Students.findById(id);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "No student data with this id"
            });
        } else {
            // Find all gallery items associated with the student
            const data = await Galery.find().exec();
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


//logout
router.delete('/logout/:id', async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id; // Get the id from params, not from body
    try {
        const student = await Students.findById(id);
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








































//get their profile
router.get('/profile/:studentId', async (req:Request, res:Response, next:NextFunction) => {
    const studentId :any = req.params.studentId;

    try {
        const student = await Students.findOne({_id:studentId});
        console.log(student)
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "no student found"
            });
        } else {
            return res.status(200).json({
                success: true,
                student:student
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




//student get events
router.get('/events/:studentid', async (req: Request, res: Response, next: NextFunction) => {
    const studentid: any = req.params.studentid; // Corrected from facultyId to studentid
    const page: number = parseInt(req.query.page as string) || 1; // Default page is 1
    const limit: number = 12; // Events per page

    try {
        const student = await Students.findById(studentid);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "No faculty found with this id"
            });
        }
        
        const totalEventsCount = await Events.countDocuments(); // Total number of events

        const events = await Events.find().sort({ to_date: -1 }).skip((page - 1) * limit).limit(limit).exec();
        console.log(events);
        const currentDate = new Date();
        const futureEvents = events.filter((item: any) => {
            return item.from_date > currentDate; // Assuming from_date is the correct field name for event start date
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
            totalPages: Math.ceil(totalEventsCount / limit),
            events: futureEvents
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});



//search by name 
router.get('/search/:studentId', async (req: Request, res: Response, next: NextFunction) => {
    const studentId: string = req.params.studentId;
    const page: number = parseInt(req.query.page as string) || 1;
    const limit: number = 12;
    try {
        const student = await Students.findById(studentId);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "No student found with this ID"
            });
        }

        const name: string = req.query.eventName as string;
        const currentDate = new Date();
        const eventsCount = await Events.countDocuments({ eventname: { $regex: name, $options: 'i' }, from_date: { $gt: currentDate } });
        const search = await Events.aggregate([
            { $match: { eventname: { $regex: name, $options: 'i' }, from_date: { $gt: currentDate } } },
            { $sort: { to_date: -1 } },
            { $skip: (page - 1) * limit },
            { $limit: limit }
        ]);

        if (search.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No events found with the given criteria"
            });
        }

        res.status(200).json({
            success: true,
            data: search,
            totalCount: eventsCount
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});


//search nmes
router.get('/serachevent/:id', async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id as string;
    try {
        const student = await Students.findById(id);
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
















router.get('/eventdetails/:studentid/:eventid', async (req: Request, res: Response, next: NextFunction) => {
    const studentid: string = req.params.studentid as string;
    const eventid: string = req.params.eventid as string;
    try {
        const student = await Students.findById(studentid);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "No student found with this id"
            });
        }
        const event = await Events.findById(eventid);
        if (!event) {
            return res.status(404).json({
                success: false,
                message: "No event found with this id"
            });
        }
        res.status(200).json({
            success: true,
            event: event
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});



type Student={
    name:string,
    email:string,
    department:string,
    section:string,
    year:string,
    rollnumber:string
}
//student register the events
router.post('/event/:studentid/:eventid', async (req: Request, res: Response, next: NextFunction) => {
    const studentId: string = req.params.studentid as string;
    const eventId: string = req.params.eventid as string;

    try {
        const student = await Students.findById(studentId);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "No student found with this ID"
            });
        }

        const event = await Events.findById(eventId);
        if (!event) {
            return res.status(404).json({
                success: false,
                message: "No event found with this ID"
            });
        }

        const studentCheck = await Registation.findOne({ student: studentId, eventid: eventId });
        if (studentCheck) {
            return res.status(400).json({
                success: false,
                message: "Student already registered for this event"
            });
        }

        const newRegistration = await Registation.create({
            student: studentId,
            eventid: eventId,
            name: student.name,
            email: student.email,
            department: student.department,
            year: student.year,
            section: student.section,
            rollnumber: student.rollnumber,
            Avathar:student.Avathar,
            Type:student.Type
        });

        if (newRegistration) {
            await Events.findByIdAndUpdate(eventId,{ $inc: { strength: -1 } })
            return res.status(201).json({
                success: true,
                message: "Successfully registered for the event"
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials for registration"
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



router.get('/upcome/:studentId', async (req: Request, res: Response, next: NextFunction) => {
    const studentId : string = req.params.studentId;
    try {
        const applications = await Registation.find({ student: studentId, status: "accept" });
        console.log(applications);
        if (applications.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No application found by the student"
            });
        }

        const eventIds = applications.map((item: any) => item.eventid);
        const events = await Events.find({ _id: { $in: eventIds } });
        const currentDate = new Date();
        const upcomingEvents = events.filter((item: any) => new Date(item.from_date) > currentDate);
        console.log(upcomingEvents)

        return res.status(200).json({
            success: true,
            applied: upcomingEvents
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});


//feedback for the student

// router.post('/feedback/:studentId/:eventId',async (req: Request, res: Response, next: NextFunction) => {
//     const studentId = req.params.studentId;
//     const eventId = req.params.eventId;
//     try {
//         const student = await Registation.findOne({ eventid: eventId, student: studentId });
//         if (!student) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Student has not registered for this event"
//             });
//         } 
//         const event = await Events.findById(eventId);
//         if (!event) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Event not found"
//             });
//         }
//         const currentDate = new Date();
//         const toDate = new Date(event.to_date as string);
//         if (toDate >= currentDate) {
//             // Event has not concluded yet, cannot provide feedback
//             return res.status(400).json({
//                 success: false,
//                 message: "Event has not concluded yet, feedback cannot be provided"
//             });
//         }
//         const checkfeedback = await Feedbacks.findOne({student:studentId,event:eventId});
//         if(checkfeedback){
//             return res.status(400).json({
//                 success:false,
//                 message:"student already send feedback"
//             })
//         }
//       const feedback =  req.body;
//        const feedbacks = await  Feedbacks.create({
//         student:studentId,
//         event:eventId,
//         feedbacks:feedback,
//         date:Date.now()
//        })
//        if(feedbacks){
//         return res.status(201).json({
//             success:true,
//             message:"feedback sent successfully"
//         })

//        }else{
//         return res.status(400).json({
//             success:false,
//             message:"some went wroung try after some time"
//         })
//        }

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error"
//         });
//     }
// });





router.post('/feedback/:studentId/:eventId', async (req: Request, res: Response, next: NextFunction) => {
    const { studentId, eventId } = req.params;

    try {
        const student = await Registation.findOne({ eventid: eventId, student: studentId });
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student has not registered for this event."
            });
        } 

        const event = await Events.findById(eventId);
        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found."
            });
        }

        

        const existingFeedback = await Feedbacks.findOne({ student: studentId, event: eventId });
        if (existingFeedback) {
            return res.status(400).json({
                success: false,
                message: "Student has already sent feedback."
            });
        }

        // Assuming feedback is a direct string from the request body
        // Adjust this based on your actual data structure e.g., req.body.feedback if it's nested
        const { feedback } = req.body;
        if (typeof feedback !== 'string') {
            return res.status(400).json({
                success: false,
                message: "Invalid feedback format."
            });
        }

        const newFeedback = await Feedbacks.create({
            student: studentId,
            event: eventId,
            feedbacks:feedback, // Assuming your schema has a field named 'feedback' for storing the feedback text
            date: new Date()
        });

        return res.status(201).json({
            success: true,
            message: "Feedback sent successfully."
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
});



























//student history
router.get('/history/:studentId', async (req: Request, res: Response, next: NextFunction) => {
    const studentId = req.params.studentId;
    try {
        const applications = await Registation.find({ student: studentId, status: "accept" });
        console.log(applications);
        if (applications.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No application found by the student"
            });
        }

        const eventIds = applications.map((item: any) => item.eventid);
        const events = await Events.find({ _id: { $in: eventIds } });
        const currentDate = new Date();
        const historyevents = events.filter((item: any) => new Date(item.from_date) < currentDate);
        console.log(historyevents)
       if(historyevents.length === 0){
        return res.status(404).json({
            success: false,
            message: "No history found by the student"
        });
       }
        return res.status(200).json({
            success: true,
            history: historyevents
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

export default router
