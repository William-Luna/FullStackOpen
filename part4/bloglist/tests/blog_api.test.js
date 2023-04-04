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

test('blog has an id property', async () => {
  const allBlogs = await helper.blogsInDb()

  const singleBlog = allBlogs[0]
  expect(singleBlog.id).toBeDefined()

})

test('a new blog can be added', async () => {
  const newBlog = {
    title: "newest blog", author: "Test Tests", url: "github.com", likes: 123
  }
  await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)

  const allBlogs = await helper.blogsInDb()
  expect(allBlogs).toHaveLength(helper.initialBlogs.length + 1)

  const blogTitles = allBlogs.map(n => n.title)
  expect(blogTitles).toContain('newest blog')
})

test('a new blog without likes property defaults to 0', async () => {
  const newBlog = {
    title: "newest blog without likes", author: "Test Tests", url: "ebay.com"
  }

  await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)

  const allBlogs = await helper.blogsInDb()
  const lastBlog = allBlogs[allBlogs.length - 1]
  expect(lastBlog.likes).toBe(0)
})

test('a blog without a title or url is not added', async () => {
  const blogWithoutTitle = {
    author: "Test Tests", url: "twitter.com", likes: 23
  }

  await api.post('/api/blogs').send(blogWithoutTitle).expect(400)

  const blogWithoutUrl = {
    title: "newest blog without url", author: "Test Tests", likes: 24
  }

  await api.post('/api/blogs').send(blogWithoutUrl).expect(400)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogsToDelete = blogsAtStart[0]

  await api.delete(`/api/blogs/${blogsToDelete.id}`).expect(204)

  const blogsAfterDeletion = await helper.blogsInDb()
  expect(blogsAfterDeletion).toHaveLength(blogsAtStart.length - 1)

  const allTitles = blogsAfterDeletion.map(b => b.title)
  expect(allTitles).not.toContain(blogsToDelete.title)
})

test('a blog can be updated', async () => {
  const allBlogs = await helper.blogsInDb()
  const blogToUpdate = allBlogs[0]

  const updatedBlog = {
    title: "updated blog", author: "Test Testss", url: "github.com", likes: 21
  }

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog).expect(200).expect('Content-Type', /application\/json/)
})

afterAll(async () => {
  await mongoose.connection.close()
})