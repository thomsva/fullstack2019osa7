import React, { useEffect } from 'react'
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
import { setUser, clearUser } from './reducers/userReducer'

const App = (props) => {

  const username = useField('text')
  const password = useField('password')

  useEffect(() => {
    props.initializeBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
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
      props.setUser(user)
      username.reset()
      password.reset()
      props.setNotification('tervetuloa käyttäjä ' + user.name, 3)
    } catch (exception) {
      props.setNotification('väärä käyttäjänimi tai salasana', 3)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    props.clearUser()
    props.setNotification('käyttäjä ' + props.user.name + ' kirjautui ulos', 3)
  }

  if (props.user === null) {
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
        <div>{props.user.name} logged in</div>
        <button onClick={handleLogout}>log out</button>
      </div>
      <BlogForm />
      <BlogList user={props.user} />
    </div>
  )
}


const mapStateToProps = (state) => {
  return { user: state.user.user }
}

export default connect(mapStateToProps, { initializeBlogs, setNotification, setUser, clearUser })(App)
