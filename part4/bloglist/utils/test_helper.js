const Blog = require('../models/blog')

const initialBlogs = [
  { title: "cool beans", author: "Test Tester", url: "google.com", likes: 100 },
  { title: "cool beans2", author: "Will", url: "youtube.com", likes: 101 }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}