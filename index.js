const express = require('express')
const mongoose = require('mongoose')
const Students = require('./models/students')
const cors = require('cors')

const app = express()
app.use(cors())
require('dotenv').config()
const PORT = process.env.PORT || 3000
const MONGO_ATLAS_URI = `mongodb+srv://sample-students:${process.env.MONGO_ATLAS_PASS}@cluster0.lhze0.mongodb.net/?retryWrites=true&w=majority`;

app.get('/', async (req, res) => {
  try {
    const students = await Students.find()
    res.status(200).json({
      data: students
    })
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
})

app.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const students = await Students.findById(id)
    res.status(200).json({
      data: students
    })
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
})

app.post('/', (req, res) => {
  res.send('In development...')
})

app.put('/:id', (req, res) => {
  res.send('In development...')
})

app.delete('/', (req, res) => {
  res.send('In development...')
})

app.listen(PORT, () => {
  mongoose.connect(MONGO_ATLAS_URI).then((result) => {
    console.log(`Connected to database`)
    console.log(`Server is running on port: ${PORT}`)
  })
})