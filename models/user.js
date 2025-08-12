import mongoose from 'mongoose'
import crypto from 'crypto'


const userSchema = new mongoose.Schema({
_id: {
  type: mongoose.Schema.Types.ObjectId,
  default: () => new mongoose.Types.ObjectId()
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
