import cors from "cors"
import express from "express"
import listEndpoints from "express-list-endpoints"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

// Connect to Mongo DB database
const mongoURL = process.env.MONGO_URL || "mongodb://localhost/happy-thoughts-api"
mongoose.connect(mongoURL)

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing. Middleware is code that runs between the request and the response, it can modify the request, the response, or decide how the server should continue.
app.use(cors())
app.use(express.json())

// Start defining your routes here. Add documentation of the API here with express-list-endpoints.
app.get("/", (req, res) => {
const endpoints = listEndpoints(app)
res.json({
  message: "Welcome to the Flower API",
  endpoints: endpoints
})

})

// Endpoint for getting all flowers and should be called /flowers. We're using RESTFUL APIs.
app.get ("/flowers", (req, res) => {
  const { color, botanicalFamily } = req.query

  let filteredFlowers = flowerData

  if (color) {
    filteredFlowers = filteredFlowers.filter(flower => flower.color.toLowerCase() === color.toLowerCase())
  }

  res.json(filteredFlowers)
})

/* Checking scent instead of color with ?scent=sweet
app.get ("/flowers", (req, res) => {
  const { scent, botanicalFamily } = req.query

  let filteredFlowers = flowerData

  if (scent) {
    filteredFlowers = filteredFlowers.filter(flower => flower.scent.toLowerCase() === scent.toLowerCase())
  }

  res.json(filteredFlowers)
})
*/

// endpoint for getting one flower
app.get ("/flowers/:id", (req, res) => {

  const flower = flowerData.find((flower) => flower.id === +req.params.id)

// tiny error handling if we get an id that doesnt exist in our data
  if (!flower) {
    return res.status(404).json({ error: "flower not found" })
  }

  res.json(flower)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
