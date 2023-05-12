import { useState } from "react"

const Blog = ({ blog }) => {
  const [blogView, toggleBlogView] = useState(false)

  const viewLabel = blogView ? 'hide' : 'view'
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
        <button>Like</button>
        <br></br>
        Submitted by {blog.user.name}
      </div>
    </div>
  )
}

export default Blog