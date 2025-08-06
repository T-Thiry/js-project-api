
// Endpoint for getting all flowers and should be called /flowers. We're using RESTFUL APIs.
app.get ("/flowers", (req, res) => {
  const { color, botanicalFamily } = req.query

  let filteredFlowers = flowerData

  if (color) {
    filteredFlowers = filteredFlowers.filter(flower => flower.color.toLowerCase() === color.toLowerCase())
  }

  res.json(filteredFlowers)
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