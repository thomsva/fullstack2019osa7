import React, { useState } from 'react'
import Togglable from './Togglable'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = (props) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const blog = {
      'author': newAuthor,
      'title': newTitle,
      'url': newUrl
    }
    props.createBlog(blog)
    props.setNotification(`Blog ${blog.title} created`, 3)
  }


  return (
    <Togglable buttonLabel="new blog">
      <h2>Luo uusi blogi</h2>
      <form onSubmit={handleSubmit}>
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



export default connect(
  null, { createBlog, setNotification }
)(BlogForm)