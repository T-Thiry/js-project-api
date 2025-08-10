import cors from 'cors'
import express from 'express'
import listEndpoints from 'express-list-endpoints'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import thoughtRoutes from './routes/thoughtRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()


// Connect to Mongo DB database
const mongoURL = process.env.MONGO_URL || "mongodb://localhost:27017/happythoughts"
mongoose.connect(mongoURL)

const port = process.env.PORT || 8080
const app = express()


// Add middlewares to enable cors and json body parsing. 
app.use(cors())
app.use(express.json())
 

// Start defining your routes here. Add documentation of the API here with express-list-endpoints.
app.get("/", (req, res) => {
  const endpoints = listEndpoints(app)
  res.json({
    message: "Welcome to the Happy Toughts",
    endpoints: endpoints
  })
})

app.use("/thoughts", thoughtRoutes)
app.use("/users", userRoutes)


// Start the server.
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
