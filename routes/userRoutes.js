import express from 'express'
import bcrypt from 'bcryptjs'
import { User } from '../models/User.js'

const router = express.Router()


// POST - Register a new user
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body
    const salt = bcrypt.genSaltSync()
    const user = new User({ email, password: bcrypt.hashSync(password, salt)
    }) 
 
    //await to not send response before database finished saving
    await user.save()
 
    res.status(201).json({
      success: true,
      message: "User created successfully.",
      response: {
        id: user._id,
        accessToken: user.accessToken
      }
    })
 
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create user.",
      response: error
    })
  }
 })


 export default router
 