import mongoose from 'mongoose';

const photoChunksSchema = mongoose.Schema({
    files_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'photo.files'
    },
    n:Number,
    data:Buffer
})

export default mongoose.model("photos.chunks",photoChunksSchema);