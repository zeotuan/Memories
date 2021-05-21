import mongoose from 'mongoose';


const postSchema = mongoose.Schema({
    title:String,
    message:String,
    creator:String,
    tags:[String],
    selectedFile:String,
    likeCount:{
        type:Number,
        default:0
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        default:[]
    }]
    ,
    createdAt:{
        type:Date,
        default: new Date()
    }
})


const postMessage = mongoose.model('postMessage',postSchema);
export default postMessage;