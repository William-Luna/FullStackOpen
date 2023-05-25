import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = event => {
    event.preventDefault()

    createBlog({
      title,
      author,
      url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h3>Create New Blog</h3>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input type="text" value={title} className="form-title" onChange={({ target }) => setTitle(target.value)} placeholder='Blog Title' />
        </div><div>
          Author:
          <input type="text" value={author} className="form-author" onChange={({ target }) => setAuthor(target.value)} placeholder='Blog Author' />
        </div><div>
          URL:
          <input type="text" value={url} className="form-url" onChange={({ target }) => setUrl(target.value)} placeholder='Blog Url' />
        </div>
        <button type="submit" className='form-submitButton'>Create</button>
      </form>
    </div>
  )
}

export default BlogForm