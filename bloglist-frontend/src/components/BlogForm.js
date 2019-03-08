import React, { useState } from 'react'
import Togglable from './Togglable'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import { Form, Button } from 'react-bootstrap'

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
    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
  }


  return (
    <Togglable buttonLabel="new blog">
      <h2>Luo uusi blogi</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Author</Form.Label>
          <Form.Control
            id='author'
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
          />
          <Form.Label>Title</Form.Label>
          <Form.Control
            id='title'
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
          />
          <Form.Label>Url</Form.Label>
          <Form.Control
            id='url'
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </Form.Group>
        <Button variant="dark" type="submit">save</Button>

      </Form>
    </Togglable >
  )
}



export default connect(
  null, { createBlog, setNotification }
)(BlogForm)