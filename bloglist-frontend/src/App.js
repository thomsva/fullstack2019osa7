import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import { useField } from './hooks/useField'
import { connect } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'

const App = (props) => {

  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)

  useEffect(() => {
    props.initializeBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
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
      props.setNotification('tervetuloa käyttäjä ' + user.name, 3)
    } catch (exception) {
      props.setNotification('väärä käyttäjänimi tai salasana', 3)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
    props.setNotification('käyttäjä ' + user.name + ' kirjautui ulos', 3)
  }

  if (user === null) {
    return (
      <div>
        <Notification />
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
      <BlogForm />
      <BlogList user={user} />

    </div>
  )
}

export default connect(null, { initializeBlogs, setNotification })(App)
