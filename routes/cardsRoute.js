const express = require('express')
const router = express.Router()
const Card = require('../models/cardSchema')

// get all cards from database
router.get('/cards', async (req, res) => {
  try {
    const response = await Card.find()
    res.status(200).json(response)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: true, message: 'Internal Server Error' })
  }
})

// get card by their unique identifier
router.get('/card/:title', async (req, res) => {
  try {
    const query = { id: req.params.title }
    const card = await Card.findOne(query)

    if (!card) {
      return res.status(404).json({ error: true, message: 'No card found' })
    }
    res.status(200).json(card?.description)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: true, message: 'Internal Server Error' })
  }
})
// create a new card & save to database
router.post('/card/create', async (req, res) => {
  try {
    const card = new Card({
      id: req.body.id,
      title: req.body.title,
      description: req.body.description,
    })
    await card.save()
    res.status(201).json(card)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: true, message: 'Internal Server Error' })
  }
})

router.get('/', (req, res) => {
  res.send('working fine')
})

module.exports = router
