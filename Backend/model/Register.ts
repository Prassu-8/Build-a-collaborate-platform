import mongoose from "mongoose";

const Register = new mongoose.Schema({
    student:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"students"
    },
    eventid:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Events"
    },
    name:String,
    email:String,
    department:String,
    year:String,
    section:String,
    rollnumber:String,
    Avathar:String,
    Type:String,
    status:{
        type:String,
        default:"processing"
    }
})


const Registation = mongoose .model('register', Register)

export default Registation