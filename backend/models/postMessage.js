import mongoose from 'mongoose';


const postSchema = mongoose.Schema({
    title:String,
    message:String,
    creatorName:String,
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }, 
    tags:[String],
    file:String,
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