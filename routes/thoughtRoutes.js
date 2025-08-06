import express from "express"
import { Thought } from './models/Thought.js';
import { authenticateUser } from "../middleware/authenticateUser.js"

const router = express.Router()

// Endpoint for getting all flowers and should be called /flowers. We're using RESTFUL APIs.
router.get ("/thoughts", async (req, res) => {
  const { color, botanicalFamily } = req.query
  try { 
    const query = req.query;
    const filteredThoughts = await Thought.find(query)

  if (filteredThoughts.length === 0) {
    // Return 404 if no thoughts are found
    return res.status(404).json({
      success: false,
      response: [],
      message: "No thoughts found for that query. Try another one."
    })
  }

   // Return 200 if thoughts are found
  res.status(200).json({
    success: true,
    response: filteredThoughts,
    message: "Success!"
  })

  } catch (error) {
   // Return 500 server error database query fails.
    res.status(500).json({
      success: false,
      response: error,
      message: "Internal server error! Failed to fetch thoughts."
    })
  }
})



// endpoint for getting one flower
app.get ("/flowers/:id", (req, res) => {

  const flower = flowerData.find((flower) => flower.id === +req.params.id)

// tiny error handling if we get an id that doesnt exist in our data
  if (!flower) {
    return res.status(404).json({ error: "flower not found" })
  }

  res.json(flower)
})