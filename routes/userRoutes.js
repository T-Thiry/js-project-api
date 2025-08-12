import express from 'express'
import bcrypt from 'bcrypt'
import { User } from '../models/user.js'

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
    console.error("Signup error:", error)
    res.status(400).json({
      success: false,
      message: "Failed to create user.",
      response: error.message 
    })
  }
 })


// POST - Login an existing user
router.post("/login", async (req, res) => {
  try {
  const { email, password } = req.body
  const user = await User.findOne({ email })
 
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        success: true,
        accessToken: user.accessToken,
        id: user.id,
        message: "Login successful"
      })
 
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid email or password"
    })
  }

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message
    })
  }
 })
 

 export default router
 