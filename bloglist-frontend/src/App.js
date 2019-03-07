import React, { useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import UserList from './components/UserList'
import { useField } from './hooks/useField'
import { connect } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setUserLoggedIn, clearUserLoggedIn, initializeUsers } from './reducers/userReducer'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'

const App = (props) => {
  const username = useField('text')
  const password = useField('password')

  useEffect(() => {
    props.initializeBlogs()
  }, [])

  useEffect(() => {
    props.initializeUsers()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUserLoggedIn(user)
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
      props.setUserLoggedIn(user)
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

  if (props.userLoggedIn === null) {
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

    <Router>
      <div>
        <Notification />
        <h1>BLOGS</h1>
        <Route exact path="/" render={() =>
          <div>

            <div>{props.userLoggedIn.name} logged in</div>
            <button onClick={handleLogout}>log out</button>
            <BlogForm />
            <BlogList user={props.userLoggedIn} />
          </div>
        } />
        <Route exact path="/users" render={() =>

          <UserList />
        } />


      </div>
    </Router>

  )
}


const mapStateToProps = (state) => {
  return { userLoggedIn: state.users.userLoggedIn }
}

export default connect(mapStateToProps, { initializeBlogs, setNotification, setUserLoggedIn, clearUserLoggedIn, initializeUsers })(App)
