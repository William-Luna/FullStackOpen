import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('form calls event handler and contains correct details for created blog', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const inputTitle = screen.getByPlaceholderText('Blog Title')
  const inputAuthor = screen.getByPlaceholderText('Blog Author')
  const inputUrl = screen.getByPlaceholderText('Blog Url')
  const submitButton = container.querySelector('.submitButton')

  await user.type(inputTitle, 'Test Title')
  await user.type(inputAuthor, 'Test Author')
  await user.type(inputUrl, 'Test Url')

  await user.click(submitButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Test Title')
  expect(createBlog.mock.calls[0][0].author).toBe('Test Author')
  expect(createBlog.mock.calls[0][0].url).toBe('Test Url')
})