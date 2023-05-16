import { useState } from "react"

const Blog = ({ blog, addLike }) => {
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
    addLike(blogWithAddedLike)
  }

  return (
    <div style={blogStyle}>
      <span>"{blog.title}" by {blog.author} </span>
      <button onClick={() => toggleBlogView(!blogView)}>{viewLabel}</button>
      <br></br>
      <div style={{ display: blogView ? '' : 'none' }}>
        <a href={blog.url}>{blog.url}</a>
        <br></br>
        {blog.likes}
        <button onClick={incrementLike}>Like</button>
        <br></br>
        Submitted by {blog.user.name}
      </div>
    </div>
  )
}

export default Blog