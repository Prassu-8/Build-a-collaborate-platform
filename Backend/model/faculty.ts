import mongoose from "mongoose";

const Faculty = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
        
    },
    password:{
        type:String
    },
    mobilenumber:{
        type:String
    },
    department:{
        type:String
    },
    Avathar:{
        type:String
    }

})



const FacultySchema =  mongoose.model('Faculty', Faculty)

export default FacultySchema 