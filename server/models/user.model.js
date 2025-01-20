import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true, // Ensures uniqueness of usernames
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    email:{
      type:String,
      required:true,
      unique:true, // Ensures uniqueness of emails
    },
    otp: {
      type: String,
    },
    otpExpires: {
      type: Date,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    isActive:{
      type:Boolean,
      default:true
    },
    profilePic:{
      type:String,
      default: " "
    }
    
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
