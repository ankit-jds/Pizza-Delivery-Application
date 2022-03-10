import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();
const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    first_name: { type: String, required: true, maxlength: 100 },
    last_name: { type: String, required: true, maxlength: 100 },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    isVerified: { type: Boolean, required: true, default: false },
    isAdmin: { type: Boolean, required: true, default: false },
    token: { type: String },
    token_datetime: { type: Number }
})

// Password is to be stored in hashed-form using JWT and bcrypt.
// For reference: https://dev.to/salarc123/mern-stack-authentication-tutorial-part-1-the-backend-1c57

UserSchema.methods.generateVerificationToken = function () {
    // I am able to use 'this' keyboard bcoz I have used traditional function definition instead of arrow function. For more knowledge refer to: 
    const user = this;

    const verificationToken = jwt.sign(
        { ID: user._id },
        process.env.USER_VERIFICATION_TOKEN_SECRET,
        { expiresIn: "7d" }
    )

    return verificationToken;

};

// module.exports=UserSchema;