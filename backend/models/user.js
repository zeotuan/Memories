import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = mongoose.Schema({
    
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    passwordHash:{
        type:String,
        required:true
    }
})

userSchema.plugin(uniqueValidator);

export default mongoose.model("User",userSchema);