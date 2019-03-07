import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { removeBlog, likeIncrease, addComment } from '../reducers/blogReducer'
import { Redirect } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const Blog = (props) => {
  console.log('Blog props', props)
  if (props.blog === null) return (<div>empty</div>)

  const [redirect, setRedirect] = useState(null)

  const extractUserName = (user) => {
    if (user === null) return 'unknown'
    return user.name
  }

  const handleLike = () => {
    props.likeIncrease(props.blog)
  }

  const handleRemove = () => {
    if (window.confirm('remove blog ' + props.blog.title + ' by ' + props.blog.author + '?')) {
      console.log('remove id', props.blog.id)
      props.removeBlog(props.blog.id)
      props.setNotification('Blog removed', 3)
      setRedirect('/')
    }
  }

  const addComment = async (event) => {
    event.preventDefault()
    const content = event.target.comment.value
    props.addComment(props.blog.id, content)
    event.target.comment.value = ''
    props.setNotification('kommentti lisättiin', 3)
  }

  const showForOwner = { display: (props.blog.user.name === props.userLoggedIn.name) ? '' : 'none' }


  if (redirect !== null) {
    return <Redirect to={redirect} />
  }

  return (
    <div>

      <h3 className='title'>{props.blog.title} by {props.blog.author}</h3>

      <div><a href={props.blog.url}>{props.blog.url}</a></div>
      <div>likes: {props.blog.likes} <Button variant="btn btn-dark" onClick={handleLike}>like</Button> </div>
      <div>added by {extractUserName(props.blog.user)}</div>
      <button onClick={handleRemove} style={showForOwner}>remove</button>

      <h4>Comments</h4>
      <Form onSubmit={addComment}>
        <Form.Control name="comment" />
        <Button variant="btn btn-dark" type="submit">lisää kommentti</Button>
      </Form>
      <ul className="list-group">
        {props.blog.comments.map((c, i) =>
          <li className="list-group-item list-group-item-light" key={i}>{c}</li>
        )}
      </ul>
    </div >
  )
}

const mapStateToProps = (state) => {
  return { userLoggedIn: state.users.userLoggedIn }
}

export default connect(
  mapStateToProps, { removeBlog, setNotification, likeIncrease, addComment }
)(Blog)


