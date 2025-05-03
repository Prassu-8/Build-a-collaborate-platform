import mongoose from 'mongoose';

const upload = new mongoose.Schema({
    faculty:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Faculty'
    },
    event:{
      type:mongoose.SchemaTypes.ObjectId,
      ref:'Events'
    },
    image: [{ type: String }],
    text:{
        type:String
    },
    date:{
        type:Date
    }
})

let galery = mongoose.model('upload',upload);

export default galery