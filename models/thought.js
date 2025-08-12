import mongoose from 'mongoose'

const thoughtSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
    unique: true, 
    default: () => Math.floor(Math.random() * 1000000) // Random ID for simplicity
  },
  message: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 140
  },
  hearts: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
 });
 
 
 export const Thought = mongoose.model("Thought", thoughtSchema)
