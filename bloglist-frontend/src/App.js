import React, { useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import Navigation from './components/Navigation'
import { useField } from './hooks/useField'
import { connect } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setUserLoggedIn, clearUserLoggedIn, initializeUsers } from './reducers/userReducer'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'
import { Button, Container, Row, Col } from 'react-bootstrap'

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
    const u = props.userLoggedIn.name
    window.localStorage.removeItem('loggedInUser')
    props.clearUserLoggedIn()
    props.setNotification('käyttäjä ' + u + ' kirjautui ulos', 3)
  }

  if (props.userLoggedIn === null) {
    return (
      <div className="container">
        <Notification />
        <LoginForm
          username={username}
          password={password}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  const userById = (id) => props.users.find(u => u.id === id)
  const blogById = (id) => props.blogs.find(b => b.id === id)

  return (

    <Router>
      <div className="container">

        <Notification />
        <Container>
          <Row>
            <Col><h1>BLOGS</h1></Col>
            <Col><div class="text-right">{props.userLoggedIn.name} logged in &nbsp;
              <Button variant="dark" onClick={handleLogout}>log out</Button></div></Col>
          </Row>
        </Container>
        <Navigation />
        <Container className="mt-3">
          <Route exact path="/" render={() =>
            <div>
              <BlogForm />
              <BlogList user={props.userLoggedIn} />
            </div>
          } />
          <Route exact path="/users" render={() =>
            <UserList />
          } />
          <Route exact path="/users/:id" render={({ match }) =>
            <User user={userById(match.params.id)} />
          } />
          <Route exact path="/blogs/:id" render={({ match }) =>
            <Blog blog={blogById(match.params.id)} />
          } />
        </Container>


      </div>
    </Router>

  )
}


const mapStateToProps = (state) => {
  return { userLoggedIn: state.users.userLoggedIn, users: state.users.users, blogs: state.blogs }
}

export default connect(mapStateToProps, { initializeBlogs, setNotification, setUserLoggedIn, clearUserLoggedIn, initializeUsers })(App)
