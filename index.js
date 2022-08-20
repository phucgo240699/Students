const express = require('express')
const mongoose = require('mongoose')
const Students = require('./models/students')
const cors = require('cors')
const { AwakeHeroku } = require("awake-heroku");
const utils = require('./utils/index')

AwakeHeroku.add("https://students-sample-1a.herokuapp.com");
const app = express()
app.use(cors())
app.use(express.json())
require('dotenv').config()
const PORT = process.env.PORT || 3000
const MONGO_ATLAS_URI = `mongodb+srv://sample-students:${process.env.MONGO_ATLAS_PASS}@cluster0.lhze0.mongodb.net/?retryWrites=true&w=majority`;

app.get('/', async (req, res) => {
  try {
    const students = await Students.find({ isDeleted: false })
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
  try {
    const { id } = req.params
    const students = await Students.findOne({ id, isDeleted: false })
    res.status(200).json({
      data: students
    })
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
})

app.post('/', async (req, res) => {
  try {
    const { name, score } = req.body
    if (utils.isNil(name)) {
      return res.status(406).send({
        error: "Missing name"
      })
    }
    if (utils.isNil(score)) {
      return res.status(406).send({
        error: "Missing score"
      })
    }
    const newStudent = await Students.create({name, score})
    res.status(200).json({
      data: newStudent
    })
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
})

app.put('/:id', (req, res) => {
  res.send('In development...')
})

app.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deletedStudent = await Students.findByIdAndUpdate(id, { isDeleted: true })
    res.status(200).json({
      data: deletedStudent
    })
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
})

app.listen(PORT, () => {
  mongoose.connect(MONGO_ATLAS_URI).then((result) => {
    console.log(`Connected to database`)
    console.log(`Server is running on port: ${PORT}`)
  })
})