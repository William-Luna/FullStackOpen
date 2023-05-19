import { useState } from 'react'

const Blog = ({ blog, addLikeService, deleteBlogService, user }) => {
  const [blogView, toggleBlogView] = useState(false)

  const viewLabel = blogView ? 'hide' : 'view'
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const incrementLike = event => {
    event.preventDefault()
    const newLikes = blog.likes + 1
    const blogWithAddedLike = { ...blog, likes: newLikes }
    addLikeService(blogWithAddedLike)
  }

  const deleteBlog = event => {
    event.preventDefault()
    deleteBlogService(blog)
  }

  return (
    <div style={blogStyle}>
      <span>{blog.title} by {blog.author} </span>
      <button onClick={() => toggleBlogView(!blogView)} className='viewbutton'>{viewLabel}</button>
      <br></br>
      <div style={{ display: blogView ? '' : 'none' }} className='blogexpanded'>
        <a href={blog.url}>{blog.url}</a>
        <br></br>
        {blog.likes}
        <button onClick={incrementLike} className='likebutton'>Like</button>
        <br></br>
        Submitted by {blog.user.name}
        <br></br>
        <button style={{ display: user.username === blog.user.username ? '' : 'none' }} onClick={deleteBlog}>Remove</button>
      </div>
    </div>
  )
}

export default Blog