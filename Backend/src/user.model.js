import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"Please provide a first name"],
    },
    lastName:{
        type:String,
        required:[true,"Please provide a last name"],
    },
    userName:{
        type:String,
        required:[true,"Please provide unique username"],
        unique: [true,"Username Exist"]
    },
    password:{
        type:String,
        required:[true,"Please provide a password"],
        unique: false
    },
    avatar:{
        type:String,
    }
});

export default mongoose.model.Users || mongoose.model('User',UserSchema) 