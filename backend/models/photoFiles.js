import mongoose from 'mongoose';

const photoFilesSchema = mongoose.Schema({
    length:Number,
    chunkSize:Number,
    uploadDate:Date,
    filename:String,
    md5:String,
    contentType:String
})

export default mongoose.model("photos.files",photoFilesSchema);