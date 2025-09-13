import mongoose from "mongoose";

// Define the schema
const userSchema = new mongoose.Schema(
  {
     fullName: {
      type: String,
      required: true,
    
    },
    email: {
      type: String,
      required: true,
      unique: true,   // no duplicate emails
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,   // you can set a rule
    },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

// Create the model
const User = mongoose.model("User", userSchema);

export default User;
