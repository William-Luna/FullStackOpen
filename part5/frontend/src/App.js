import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notiMsg, setNotiMsg] = useState(null)
  const [msgStatus, setMsgStatus] = useState(true)

  useEffect(() => {
    blogService.getAll().then(allBlogs =>
      setBlogs(allBlogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      console.log(`${user.name} has logged in successfully.`)
      setUsername('')
      setPassword('')
      setMsgStatus(true)
      setNotiMsg(`${user.name} has logged in successfully.`)
      setTimeout(() => {
        setNotiMsg(null)
      }, 5000)

    } catch (exception) {
      setMsgStatus(false)
      setNotiMsg('Wrong Credentials')
      setTimeout(() => {
        setNotiMsg(null)
      }, 5000)
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    setMsgStatus(true)
    setNotiMsg('Successfully logged out')
    setTimeout(() => {
      setNotiMsg(null)
    }, 5000)
  }

  const createBlog = async event => {
    event.preventDefault()

    const blogObj = {
      title,
      author,
      url
    }
    try {
      const returnedBlog = await blogService.create(blogObj)

      setBlogs(blogs.concat(returnedBlog))

      setMsgStatus(true)
      setNotiMsg(`Blog "${title}" has been added`)
      setTimeout(() => {
        setNotiMsg(null)
      }, 5000)

      setTitle('')
      setUrl('')
      setAuthor('')
    } catch (err) {
      setMsgStatus(false)
      setNotiMsg(`Error: ${err}`)
      setTimeout(() => {
        setNotiMsg(null)
      }, 5000)
    }


  }

  if (user === null) {
    return (
      <div>
        <h2>Please log in</h2>
        <Notification message={notiMsg} status={msgStatus} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <div>
        <Notification message={notiMsg} status={msgStatus} />
        {user.name} logged in.
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div>
        <h3>Create New Blog</h3>
        <form onSubmit={createBlog}>
          <div>
            Title:
            <input type="text" value={title} name="title" onChange={({ target }) => setTitle(target.value)} />
          </div><div>
            Author:
            <input type="text" value={author} name="author" onChange={({ target }) => setAuthor(target.value)} />
          </div><div>
            URL:
            <input type="text" value={url} name="url" onChange={({ target }) => setUrl(target.value)} />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App