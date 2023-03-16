const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')

const mongoUrl = 'mongodb+srv://main:s8leuC6jDGDTbZbY@cluster0.3kpgvsf.mongodb.net/BlogList?retryWrites=true&w=majority'
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app