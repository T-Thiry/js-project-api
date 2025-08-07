import express from "express"
import { Thought } from 'models/thought.js'
import { authenticateUser } from "../middleware/authenticateUser.js"

const router = express.Router()

// Endpoint for getting all thoughts.
router.get("/thoughts", async (req, res) => {
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


// GET - Get a single thought by ID (endpoint is /thoughts/:id)
router.get("/thoughts/:id", async (req, res) => {
  const { id } = req.params

  try { 
    const thought = await Thought.findById(id)

  if (!thought) {
    return res.status(404).json({
      success: false,
      response: [],
      message: "Thought not found"
    })
  }

  res.status(200).json({
    success: true,
    response: thought
  })

  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
      message: "Internal server error! Failed to fetch thought."
    })
  }
})


// PATCH - Like a thought
router.patch("/thoughts/:id/like", async (req,res) => {
  const { id } = req.params
 
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      id,
      { $inc: { hearts: 1 }}, // increase like by 1
      { new: true }
    )
     if (!updatedThought) {
      return res.status(404).json({
        success: false,
        response: [],
        message: "Thought not found."
      })
    }
 
    res.status(200).json({
      success: true,
      response: updatedThought,
      message: "Thought liked successfully."
    })
 
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
      message: "Internal server error! Failed to like the thought."
    })
  }
})


// POST - Create a thought (endpoint is /thoughts)
router.post("/thoughts", authenticateUser, async (req, res) => {
  const { message } = req.body
  const user = req.user
 
  try {
    const newThought = await new Thought({ message, user: user._id }).save()
 
    if (!newThought)
      res.status(400).json({
        success: false,
        response: [],
        message: "Failed to post thought"
      })

      res.status(201).json({
        success: true,
        response: newThought,
        message: "Thought created successfully."
      })
 
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
      message: "Internal server error! Failed to post thought"
    })
  }
})
 

// PATCH - Update a thought (endpoint is thoughts/:id)
router.patch("/thoughts/:id", authenticateUser, async (req, res) => {
  const { id } = req.params
  const { message } = req.body
 
  try {
    const updatedThought = await Thought.findByIdAndUpdate(id, { message }, {
      new: true,
      runValidators: true
    })
 
    if(!updatedThought) {
      return res.status(404).json({
        success: false,
        response: [],
        message: "Thought not found"})
    }
  
    res.status(200).json({
      success: true,
      response: updatedThought,
      message: "Thought updated successfully"
    })
 
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
      message: "Internal server error! Failed to update thought."
      })
  }
 })


// DELETE - Delete a thought (endpoint is thoughts/:id)
router.delete("/thoughts/:id", authenticateUser, async (req, res) => {
  const { id } = req.params
  const userId = req.user._id
 
  try {
    const thought = await Thought.findById(id)
 
    if (!thought) {
      return res.status(404).json({
        success: false,
        response: [],
        message: "Failed to delete thought! Thought not found"})
    }
   
    if (thought.user.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        response: [],
        message: "Failed to delete thought! You are not authorized to delete this thought."
      })
    }
 
    // Delete the thought
    await Thought.findByIdAndDelete(id)
 
    res.status(200).json({
      success: true,
      response: id,
      message: "Thought deleted successfully"
      })
 
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
      message: "Internal server error! Failed to update thought."
      })
  }
 })
 
 
 export default router
 
 