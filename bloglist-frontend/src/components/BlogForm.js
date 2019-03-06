import React, { useState } from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = ({ blogs, setBlogs, setNotification }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const createBlog = (event) => {
    event.preventDefault()
    const blog = {
      'author': newAuthor,
      'title': newTitle,
      'url': newUrl
    }
    blogService
      .create(blog)
      .then(response => {
        setNewAuthor('')
        setNewTitle('')
        setNewUrl('')
        setBlogs(blogs.concat(response))
        console.log('ploki: ', blog)
        setNotification('created anecdote: ' + blog.title, 3)
      })
      .catch(() => {
        setNotification('Lisääminen epäonnistui', 3)
      })
  }

  return (
    <Togglable buttonLabel="new blog">
      <h2>Luo uusi blogi</h2>
      <form onSubmit={createBlog}>
        <div>Author<input
          value={newAuthor}
          onChange={({ target }) => setNewAuthor(target.value)}
        /></div>
        <div>Title<input
          value={newTitle}
          onChange={({ target }) => setNewTitle(target.value)}
        /></div>
        <div>Url<input
          value={newUrl}
          onChange={({ target }) => setNewUrl(target.value)}
        /></div>
        <button type="submit">tallenna</button>
      </form>
    </Togglable>
  )
}

BlogForm.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired
}

export default connect(
  null, { setNotification }
)(BlogForm)