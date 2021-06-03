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
        required:false
    },
    confirmed: { 
        type: Boolean, 
        default: false 
    },
    imageUrl:String,
    googleInfo:{
        id:String,
        token:String,
        email:String,
        email_verified:{
            type:Boolean,
            default:false
        },
        locale:String
    },
})

userSchema.plugin(uniqueValidator);

export default mongoose.model("User",userSchema);