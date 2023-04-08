const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  if (!request.body.title || !request.body.url) return response.status(400).json({ error: 'Missing title or author' })

  const user = request.user //from userExtractor middleware

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: user.id
  })

  const savedBlog = await blog.save()
  console.log("Blog saved...")
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  console.log("...and blog saved under user")
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user //from userExtractor middleware
  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() !== user._id.toString())
    return response.status(401).json({ error: 'User does not match user that created the blog.' })

  await Blog.findByIdAndRemove(request.params.id)
  console.log(`Blog ${request.params.id} has been removed...`)

  const index = user.blogs.indexOf(user._id)
  user.blogs.splice(index, 1)
  await user.save()
  console.log('...and blog removed under user')

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0
  }

  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).json(blog)
})

module.exports = blogsRouter