import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import { useField } from './hooks/useField'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('info')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    const credentials = { 'username': username.value, 'password': password.value }
    try {
      const user = await loginService.login(credentials)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      username.reset()
      password.reset()
      setNotification('tervetuloa käyttäjä ' + user.name)
      setNotificationType('info')
      setTimeout(() => {
        setNotification(null)
      }, 2000)
    } catch (exception) {
      setNotification('väärä käyttäjänimi tai salasana')
      setNotificationType('error')
      setTimeout(() => {
        setNotification(null)
      }, 2000)
    }
  }


  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setNotification('käyttäjä ' + user.name + ' kirjautui ulos')
    setNotificationType('info')
    setTimeout(() => {
      setNotification(null)
    }, 2000)
    setUser(null)
  }

  if (user === null) {
    return (
      <div><Notification message={notification} type={notificationType} />
        <LoginForm
          username={username}
          password={password}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <Notification />
      <div>
        <h2>blogs</h2>
        <div>{user.name} logged in</div>
        <button onClick={handleLogout}>log out</button>
      </div>
      <BlogForm blogs={blogs} setBlogs={setBlogs} setNotification={setNotification} setNotificationType={setNotificationType} />
      <BlogList blogs={blogs} setBlogs={setBlogs} setNotification={setNotification} setNotificationType={setNotificationType} user={user} />
    </div>
  )
}

export default App