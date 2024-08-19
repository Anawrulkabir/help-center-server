const express = require('express')
const router = express.Router()
const Card = require('../models/cardSchema')

// get all cards from database
router.get('/cards', async (req, res) => {
  try {
    const search = req.query.search || ''
    const desquery = {
      description: { $regex: search, $options: 'i' },
    }
    const titlequery = {
      title: { $regex: search, $options: 'i' },
    }
    const query = {
      $or: [desquery, titlequery],
    }

    const response = await Card.find(query)
    res.status(200).json(response)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: true, message: 'Internal Server Error' })
  }
})

// search for any kind of element

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

// router.get('/search', async (req, res) => {
//   try {
//     const search = req.query.search || ''
//     const query = {
//       description: { $regex: search, $options: 'i' },
//       title: { $regex: search, $options: 'i' },
//     }
//     const results = await Card.find(query)

//     res.status(200).json(results)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ error: true, message: 'Internal Server Error' })
//   }
// })

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
