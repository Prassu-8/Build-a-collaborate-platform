import mongoose from "mongoose";

const Feedback = new mongoose.Schema({
    student:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"students"
    },
    event:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Events"
    },
    feedbacks:{
        type:String
    },
    date:{
        type:Date
    }
})

const Feedbacks = mongoose.model('Feedback', Feedback);

export default Feedbacks