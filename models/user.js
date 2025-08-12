import mongoose from 'mongoose'
import crypto from 'crypto'


const userSchema = new mongoose.Schema({
_id: {
  type: Number,
  required: true,
  unique: true, 
  default: () => Math.floor(Math.random() * 1000000) // Random ID for simplicity
},
 name: {
   type: String,
   required: true,
 },
 email: {
   type: String,
   required: true,
   unique: true
 },
 password: {
   type: String,
   required: true,
 },
 accessToken: {
   type: String,
   default: () => crypto.randomBytes(128).toString('hex')
 }
});


export const User = mongoose.model("User", userSchema);
