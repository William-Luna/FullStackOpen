const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('../utils/test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promisesAddingBlogs = blogObjects.map(note => note.save())
  await Promise.all(promisesAddingBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})