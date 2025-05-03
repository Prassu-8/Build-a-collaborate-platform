import mongoose from "mongoose";

const Event = new mongoose.Schema({
    facultyid:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Faculty"
    },
    eventname:{
        type:String,
    },
    from_date:{
        type:Date
    },
    to_date:String,
    start_time:String,
    end_time:String,
    strength:Number,
    participation:String,
    poster:String,
    organized:String,
    date:Date,
    department:String
})


const Events = mongoose.model('Events',Event)

export default Events