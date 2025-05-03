import mongoose from "mongoose";


const Student = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    department:{
        type:String
    },
    year:{
        type:String
    },
    section:{
        type:String
    },
    rollnumber:{
        type:String
    },
    Avathar:{
        type:String
    },
    Type:{
        type:String
    }
})

const Students =  mongoose.model('students',Student);

export default Students