import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author', () => {
  const blogUser = { name: 'testname', username: 'testusername' }
  const blog = { title: 'Test title', author: 'Test author', user: blogUser, url: 'test.com', likes: 1 }

  const mockHandler = jest.fn()

  const { container } = render(<Blog blog={blog} addLikeService={mockHandler} deleteBlogService={mockHandler} user={blogUser} />)

  const element = screen.getByText('Test title by Test author')
  expect(element).toBeDefined()

  const urlAndLikes = container.querySelector('.blogexpanded')
  expect(urlAndLikes).not.toBeVisible()
})

test('clicking expanded view button', async () => {
  const blogUser = { name: 'testname', username: 'testusername' }
  const blog = { title: 'Test title', author: 'Test author', user: blogUser, url: 'test.com', likes: 1 }

  const mockHandler = jest.fn()

  const { container } = render(<Blog blog={blog} addLikeService={mockHandler} deleteBlogService={mockHandler} user={blogUser} />)

  const user = userEvent.setup()
  const button = container.querySelector('.viewbutton')
  await user.click(button)

  const urlAndLikes = container.querySelector('.blogexpanded')
  expect(urlAndLikes).toBeVisible()

})

test('blog is liked twice', async () => {
  const blogUser = { name: 'testname', username: 'testusername' }
  const blog = { title: 'Test title', author: 'Test author', user: blogUser, url: 'test.com', likes: 1 }

  const mockHandler = jest.fn()
  const likeHandler = jest.fn()

  const { container } = render(<Blog blog={blog} addLikeService={likeHandler} deleteBlogService={mockHandler} user={blogUser} />)

  const user = userEvent.setup()
  const button = container.querySelector('.viewbutton')
  await user.click(button)

  const likeButton = container.querySelector('.likebutton')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(likeHandler.mock.calls).toHaveLength(2)
})