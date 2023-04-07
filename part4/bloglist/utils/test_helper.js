const Blog = require('../models/blog')
const User = require('../models/user')

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

module.exports = {
  initialBlogs, blogsInDb, initialUsers, usersInDb
}