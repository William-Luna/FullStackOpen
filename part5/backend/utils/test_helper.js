const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const initialBlogs = [
  { title: "cool beans", author: "Test Tester", url: "google.com", likes: 100 },
  { title: "cool beans2", author: "Will", url: "youtube.com", likes: 101 }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const initialUsers = [
  { username: "firstuser", name: "Will Luna", passwordHash: "fakeHash" },
  { username: "seconduser", name: "Luna Will", passwordHash: "alsoFake" }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const createToken = async (username) => {
  const user = await User.findOne({ username: username })
  const userForToken = {
    username: user.username,
    id: user._id
  }

  return jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 })
}

module.exports = {
  initialBlogs, blogsInDb, initialUsers, usersInDb, createToken
}