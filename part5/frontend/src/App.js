import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
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

  const blogFormRef = useRef()

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

  const createBlog = async blogObj => {

    try {
      const returnedBlog = await blogService.create(blogObj)

      blogFormRef.current.toggleVisibility()

      setBlogs(blogs.concat(returnedBlog))

      setMsgStatus(true)
      setNotiMsg(`Blog "${blogObj.title}" has been added`)
      setTimeout(() => {
        setNotiMsg(null)
      }, 5000)

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
      <Togglable buttonLabel='Create New Blog' ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App